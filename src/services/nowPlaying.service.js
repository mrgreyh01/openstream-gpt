import nowPlayingModel from '../models/nowPlaying.model.js';

async function nowPlayingService(user) {

    try {
            if (user) {
                const res = await fetch('/api/movies/nowplaying');
                if (!res.ok) return null;
                
                let json = await res.json();

                json = JSON.parse(JSON.stringify(json.results));
                
                const nowPlaying = json.map((movieData) => new nowPlayingModel(movieData));
                console.log("This is from the service of nowPlaying: ", nowPlaying);
                
                return nowPlaying;
            } else {
                return null;
            }

        } catch (err) {
            console.error(err);
            return null;
        }
}

export default nowPlayingService;