import movieTrailerModel from '../models/movieTrailer.model.js';

async function movieTrailerService() {

    try {
        
        const res = await fetch('/api/movies/trailer/');

        if(!res.ok) return null;

        const json = await res.json();

        console.log("This is from the service of movieTrailer: ", json);
        
        return json;

    } catch (err) {
        console.error(err);
        return null;
    }
}

export default movieTrailerService;