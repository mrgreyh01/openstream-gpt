import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlaying: null,
    trailerVideo: null,
  },
  reducers: {
    setNowPlaying: (state, action) => {
      state.nowPlaying = action.payload;
    },
    removeNowPlaying: (state) => {
      state.nowPlaying = null;
    },
    setTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
    removeTrailerVideo: (state) => {
      state.trailerVideo = null;
    },
  },
});

export const { setNowPlaying, removeNowPlaying, setTrailerVideo, removeTrailerVideo } = movieSlice.actions;
export default movieSlice.reducer;