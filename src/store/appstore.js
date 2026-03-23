import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userslice'
import movieReducer from './slices/movieslice'

const appStore = configureStore({
    reducer: {
      users: userReducer,
      movies: movieReducer
    },

    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })

})

export default appStore