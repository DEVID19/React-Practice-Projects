import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  habits: JSON.parse(localStorage.getItem("habits")) || [],
};

export const habitSlice = createSlice({
  name: "habits",
  initialState,
  reducers: {
    addHabit: (state, action) => {
      // Logic to add a habit
      const { title, frequency } = action.payload;
      state.habits.push({
        id: nanoid(),
        title,
        frequency,
        completedDays: [],
      });
    },

    toggleDay: (state, action) => {
      const { habitId, day } = action.payload;

      const habit = state.habits.find((h) => h.id === habitId);

      if (habit) {
        if (habit.completedDays.includes(day)) {
          habit.completedDays = habit.completedDays.filter((d) => d !== day);
        } else {
          habit.completedDays.push(day);
        }
      }
    },

    deleteHabit: (state, action) => {
      state.habits =   state.habits.filter((habit) => habit.id !== action.payload.id);
    },
  },
});

export const { addHabit , toggleDay , deleteHabit } = habitSlice.actions;

export default habitSlice.reducer;
