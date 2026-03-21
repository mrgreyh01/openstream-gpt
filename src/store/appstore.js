import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userslice'

const appStore = configureStore({
    reducer: {
      users: userReducer
    }
})

export default appStore