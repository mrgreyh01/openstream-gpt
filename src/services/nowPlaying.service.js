import nowPlayingModel from '../models/nowPlaying.model.js';
import { API_URL } from '@/utils/contants'; 

async function nowPlayingService(user) {

    const url = API_URL + 'now_playing';
    const options = {
        method: 'GET', 
        headers: {
            accept: 'application/json',
            Authorization: "Bearer " + process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN
        }
    };

    try {
            if (user) {
                const res = await fetch(url, options);
                let json = await res.json();

                json = JSON.parse(JSON.stringify(json.results));
                
                const nowPlaying = json.map((movieData) => new nowPlayingModel(movieData));
                return nowPlaying;
            } else {
                return null;
            }

        } catch (err) {
            console.error(err);
            return [];
        }
}

export default nowPlayingService;