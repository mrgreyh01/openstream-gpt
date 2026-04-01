import mongoose from "mongoose";

const trailerSchema = new mongoose.Schema({
  title: String,
  overview: String,
  key: String,      
  trailerUrl: String,
  cloudinaryPublicId: String, 
}, { strict: false });

const TrailerModel = mongoose.models.trailer || mongoose.model('trailer', trailerSchema);

export default TrailerModel;