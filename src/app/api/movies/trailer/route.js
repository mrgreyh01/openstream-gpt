import { NextResponse } from 'next/server';
import MongoDBConnect from '@/lib/mongoose';
import Trailer from '@/models/schema/Trailer.model';
import mongoose from 'mongoose';

export async function GET() {
  
  try {

    await MongoDBConnect(); // Establish or retrieve the connection
    
    // Fetch all movies from the OpenStream database
    const trailer = await Trailer.findOne(); 
    console.log("This is from the route of trailer: ", trailer);

    return NextResponse.json(trailer);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: 'Failed to fetch movies' }, { status: 500 });
  }
}

// export async function POST(request) {
//   try {
//     await dbConnect();
//     const { title, key, heroVideoUrl, thumbnailUrl } = await request.json();
//     const trailer = new Trailer({ title, key, heroVideoUrl, thumbnailUrl });
//     await trailer.save();
//     return NextResponse.json(trailer);
//   } catch (error) {
//     console.error("Database Error:", error);
//     return NextResponse.json({ error: 'Failed to fetch movies' }, { status: 500 });
//   }
// }