import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongoose';
import Trailer from '@/models/schema/Trailer.model';

export async function GET() {
  try {
    await dbConnect(); // Establish or retrieve the connection
    
    // Fetch all movies from the OpenStream database
    const trailers = await Trailer.find({}); 
    
    return NextResponse.json(trailers);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: 'Failed to fetch movies' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const { title, key, heroVideoUrl, thumbnailUrl } = await request.json();
    const trailer = new Trailer({ title, key, heroVideoUrl, thumbnailUrl });
    await trailer.save();
    return NextResponse.json(trailer);
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: 'Failed to fetch movies' }, { status: 500 });
  }
}