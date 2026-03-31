import { NextResponse } from 'next/server';
import { API_OPTIONS, API_URL } from '@/utils/constants.js';

export async function GET(request) {

  const { searchParams } = new URL(request.url);
  const movieId = searchParams.get('movieId');

  if (!movieId) {
    return NextResponse.json({ error: 'Movie ID is required' }, { status: 400 });
  }

  const url = API_URL + movieId + '/videos';
  try {
    const response = await fetch(url, API_OPTIONS);
    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch trailer' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { movieId } = await request.json();
    if (!movieId) {
      return NextResponse.json({ error: 'Movie ID is required' }, { status: 400 });
    }
    const url = API_URL + movieId + '/videos';
    const response = await fetch(url, API_OPTIONS);
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch trailer' }, { status: 500 });
  }
}