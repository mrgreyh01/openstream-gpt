import movieTrailerModel from '../models/movieTrailer.model.js';

async function movieTrailerService(movieId) {

    try {
        
        const res = await fetch('/api/movies/trailer/key?movieId=' + movieId);

        if(!res.ok) return null;

        let json = await res.json();

        json = JSON.parse(JSON.stringify(json.results));

        json = json.filter((trailerData) => trailerData.type === 'Trailer');
        
        const movieTrailer = json.map((trailerData) => new movieTrailerModel(trailerData));
        console.log("This is from the service of movieTrailer: ", movieTrailer);
        
        return movieTrailer;

    } catch (err) {
        console.error(err);
        return null;
    }
}

export default movieTrailerService;