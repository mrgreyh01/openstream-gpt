import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    nowPlaying: null,
  },
  reducers: {
    setNowPlaying: (state, action) => {
      state.nowPlaying = action.payload;
    },
    removeNowPlaying: (state) => {
      state.nowPlaying = null;
    },
  },
});

export const { setNowPlaying, removeNowPlaying } = movieSlice.actions;
export default movieSlice.reducer;