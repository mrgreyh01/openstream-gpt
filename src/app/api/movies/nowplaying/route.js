import { NextResponse } from 'next/server';
import { API_OPTIONS, API_URL } from '@/utils/constants.js'; 

export async function GET() {
  const url = API_URL + 'now_playing';

  try {
    const response = await fetch(url, API_OPTIONS);

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch from TMDB' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}