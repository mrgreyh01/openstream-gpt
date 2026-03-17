import { createSlice } from "@reduxjs/toolkit";

// const defaultUser = { uid: null, email: null, displayName: null };

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state, action) => {
      state.user = null;
    }
  },
});

export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;