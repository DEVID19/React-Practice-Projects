import { configureStore } from '@reduxjs/toolkit'
import habitsReducer from './habitSlice'  
export const store = configureStore({
   reducer: {
     habits:habitsReducer,
  },
})