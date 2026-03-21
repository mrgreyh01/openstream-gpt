import nowPlayingModel from '../models/nowPlaying.model.js';
import { API_URL } from '@/utils/contants';

async function nowPlayingService() {
    const url = API_URL + 'now_playing';
    const options = {
        method: 'GET', 
        headers: {
            accept: 'application/json',
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN
        }
    };

    try {
        const res = await fetch(url, options);
        const json = await res.json();
        
        const nowPlaying = json.results.map((movieData) => new nowPlayingModel(movieData));
        return nowPlaying;
    } catch (err) {
        console.error(err);
        return [];
    }
}

export default nowPlayingService;