import { configureStore } from '@reduxjs/toolkit'
import habitsReducer from './habitSlice'  
export const store = configureStore({
  reducer: {
    habits: habitsReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("habits", JSON.stringify(state.habits.habits));
});