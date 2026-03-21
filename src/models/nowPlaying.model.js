class nowPlaying {
  constructor(data) {
    this.title = data.original_title;
    this.overview = data.overview;
    this.rating = data.vote_average;
    this.poster = data.poster_path;
    this.id = data.id;
  }

}

export default nowPlaying;
