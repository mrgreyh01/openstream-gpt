import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlaying: null,
    trailer: null,
  },
  reducers: {
    setNowPlaying: (state, action) => {
      state.nowPlaying = action.payload;
    },
    removeNowPlaying: (state) => {
      state.nowPlaying = null;
    },
    setTrailer: (state, action) => {
      state.trailer = action.payload;
    },
    removeTrailer: (state) => {
      state.trailer = null;
    },
  },
});

export const { setNowPlaying, removeNowPlaying, setTrailer, removeTrailer } = movieSlice.actions;
export default movieSlice.reducer;