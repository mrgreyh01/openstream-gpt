import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import { YtDlp } from 'ytdlp-nodejs';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { log } from 'console';

// --- BULLETPROOF ENV LOADER ---
// This ensures the script always finds the .env file in the folder one level up,
// regardless of where you run the terminal command from.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const ytdlp = new YtDlp();

// ---------------------------------------------------------
// 1. CONFIGURATION & SETUP
// ---------------------------------------------------------

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Mongoose Schema & Model
const trailerSchema = new mongoose.Schema({
  title: String,
  overview: String,
  key: String,      
  trailerUrl: String,
  cloudinaryPublicId: String, 
}, { strict: false });

const TrailerModel = mongoose.models.trailer || mongoose.model('trailer', trailerSchema);

// TMDB API Keys & URLs
const TMDB_API_KEY = process.env.TMDB_API_KEY; 
const TMDB_NOW_PLAYING_URL = `https://api.themoviedb.org/3/movie/now_playing?api_key=${TMDB_API_KEY}`;


// ---------------------------------------------------------
// 2. DOWNLOAD HELPER FUNCTION (Using ytdlp-nodejs)
// ---------------------------------------------------------

async function downloadWithYtDlp(youtubeUrl) {
  // 1. Create a unique ID, but LEAVE OFF the extension
  const uniqueId = `trailer_${Date.now()}`;
  
  // 2. Use %(ext)s so yt-dlp can dynamically assign .mp4, .mkv, .webm, etc.
  const outputPathTemplate = path.resolve(__dirname, `${uniqueId}.%(ext)s`);
  const cookiesPath = path.resolve(__dirname, '../cookies.txt');

  console.log(`\nPreparing environment (checking for FFmpeg)...`);

  try {
    // 3. Automatically download FFmpeg if it's missing! (Crucial for GitHub Actions)
    await ytdlp.downloadFFmpeg();

    console.log(`Starting ytdlp-nodejs download for: ${youtubeUrl}...`);

    // 4. Execute the download
    await ytdlp.downloadAsync(youtubeUrl, {
      format: { 
        filter: 'mergevideo', 
        quality: '1080p'       
      },
      output: outputPathTemplate, 
      cookies: cookiesPath, 
      onProgress: (progress) => {
        process.stdout.write(`\rDownloading: ${progress.percentage_str}`);
      }
    });

    console.log(`\nDownload process finished. Locating the file...`);

    // 5. THE FILE HUNTER: Scan the directory to find the exact file yt-dlp generated
    const files = fs.readdirSync(__dirname);
    const downloadedFile = files.find(file => file.startsWith(uniqueId));

    if (!downloadedFile) {
      throw new Error(`yt-dlp finished, but no file starting with ${uniqueId} was created.`);
    }

    // 6. Get the true path of the file (e.g., trailer_123.webm)
    const finalPath = path.resolve(__dirname, downloadedFile);
    console.log(`File located successfully: ${downloadedFile}`);
    
    // Return this exact path to Cloudinary
    return finalPath;

  } catch (error) {
    console.error(`\nyt-dlp execution error:`, error);
    throw error;
  }
}
// ---------------------------------------------------------
// 3. MAIN LOGIC PIPELINE
// ---------------------------------------------------------

async function updateLatestTrailer() {
  try {
    // Connect to MongoDB
    const MONGODB_URI = process.env.MONGODB_URI
    console.log("Connecting to database...");
    await mongoose.connect(MONGODB_URI);
    console.log("Database connected.");

    // --- PHASE 1 & 2: THE HUNTER LOOP ---

    const nowPlayingRes = await fetch(TMDB_NOW_PLAYING_URL);
    const nowPlayingData = await nowPlayingRes.json();

    const movies = nowPlayingData.results;
    
    if (!movies || movies.length === 0) {
      console.log("No movies found in the TMDB response. Aborting.");
      return;
    }

    const existingEntry = await TrailerModel.findOne({});
    
    // Variables to hold our final winner once we find it
    let topMovieId = null;
    let topMovieTitle = null;
    let topMovieOverview = null;
    let youtubeUrl = null;

    // Loop through the movies one by one
    for (let i = 0; i < movies.length; i++) {
      const currentMovie = movies[i];
      const currentId = currentMovie.id.toString();
      const currentTitle = currentMovie.title;
      const currentOverview = currentMovie.overview;

      console.log(`Checking [${i + 1}/${movies.length}]: "${currentTitle}"...`);

      // 1. Fetch trailer data for this specific movie
      const videosRes = await fetch(`https://api.themoviedb.org/3/movie/${currentId}/videos?api_key=${TMDB_API_KEY}`);
      const videosData = await videosRes.json();

      // 2. Look for an official YouTube trailer
      const trailerObj = videosData.results?.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );

      // 3. If a trailer exists, evaluate it
      if (trailerObj) {
        console.log(`Valid YouTube trailer found for "${currentTitle}".`);

        // Check if this exact movie is already in our database
        if (existingEntry && existingEntry.key === currentId) {
          console.log(`The highest-ranking available trailer is still "${currentTitle}". No updates needed.`);
          return; // Stop the entire script, no downloads needed!
        }

        // If it's a new movie, lock in the details and BREAK the loop
        console.log(`New top trailer detected! Preparing to download...`);
        topMovieId = currentId;
        topMovieTitle = currentTitle;
        topMovieOverview = currentOverview;
        youtubeUrl = `https://www.youtube.com/watch?v=${trailerObj.key}`;
        break; // Exits the loop immediately

      } else {
        // If no trailer, the loop automatically continues to the next movie
        console.log(`No trailer found for "${currentTitle}". Moving to next...`);
      }
    }

    // --- SAFETY CHECK ---
    // If the loop finishes and we STILL don't have an ID, it means 0 out of 20 movies had trailers.
    if (!topMovieId || !youtubeUrl) {
      console.log("No YouTube trailers were found for ANY of the current top movies. Aborting.");
      return;
    }

    // --- PHASE 3: DOWNLOADING & UPLOADING ---
    const downloadedVideoPath = await downloadWithYtDlp(youtubeUrl); 
    console.log("Syncing with Cloudinary and Database...");

    if (!existingEntry) {
      // First run: Upload and Create
      const uploadResult = await cloudinary.uploader.upload(downloadedVideoPath, { resource_type: "video", folder: "trailers" });
      await TrailerModel.create({
        title: topMovieTitle,
        overview: topMovieOverview,
        key: topMovieId,
        trailerUrl: uploadResult.secure_url,
        cloudinaryPublicId: uploadResult.public_id
      });
      console.log("First trailer uploaded and saved!");
    } else {
      // Update: Delete old, Upload new, Update DB
      if (existingEntry.cloudinaryPublicId) {
        await cloudinary.uploader.destroy(existingEntry.cloudinaryPublicId, { resource_type: "video" });
      }
      const uploadResult = await cloudinary.uploader.upload(downloadedVideoPath, { resource_type: "video", folder: "trailers" });
      
      if (uploadResult) {
        existingEntry.title = topMovieTitle;
        existingEntry.overview = topMovieOverview;
        existingEntry.key = topMovieId; 
        existingEntry.trailerUrl = uploadResult.secure_url;
        existingEntry.cloudinaryPublicId = uploadResult.public_id;

        try {
          await existingEntry.save();
          console.log("Successfully replaced the old trailer with the new one!");
        } catch (error) {
          console.error("Error updating the trailer:", error);
          await cloudinary.uploader.destroy(uploadResult.public_id, { resource_type: "video" });
          fs.unlinkSync(downloadedVideoPath);
        }
      }
    }

    // Clean up: delete the local file so your server doesn't fill up with mp4s
    fs.unlinkSync(downloadedVideoPath);
    console.log("Local temporary file deleted.");

  } catch (error) {
    console.error("Error in the trailer pipeline:", error);
  } finally {
    // Always close the database connection when done
    await mongoose.disconnect();
    console.log("Database disconnected. Script finished.");
  }
}

// ---------------------------------------------------------
// 4. EXECUTE THE SCRIPT
// ---------------------------------------------------------
updateLatestTrailer();