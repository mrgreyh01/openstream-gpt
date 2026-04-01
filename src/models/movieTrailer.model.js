class MovieTrailer {
  constructor(data) {
    this.title = data?.title;
    this.overview = data?.overview;
    this.trailerUrl = data?.trailerUrl;
    this.cloudinaryPublicId = data?.cloudinaryPublicId; 
  }

}

export default MovieTrailer;
