import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Trash2 } from "lucide-react";
import { deleteHabit, toggleDay } from "../app/habitSlice";

const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const HabitList = () => {
  const habits = useSelector((state) => state.habits.habits);
  const dispatch = useDispatch();

  if (habits.length === 0) {
    return <p className="text-center text-gray-500">No Habit Added </p>;
  }
  return (
    <div className="space-y-4 mt-8">
      {habits.map((habit) => (
        <div className="p-4 border rounded shadow  " key={habit.id}>
          <div className="flex justify-between items-start mb-2 ">
            <h2>{habit.title}</h2>
            <p>{habit.frequency}</p>
            <button onClick={() => dispatch(deleteHabit({ id: habit.id }))}>
              <Trash2 className="w-5 h-5 text-red-500 hover:text-red-600" />
            </button>
          </div>

          {habit.frequency === "Daily" && (
            <div className="flex  flex-wrap gap-2">
              {day.map((day) => (
                <button
                  key={day}
                  onClick={() =>
                    dispatch(toggleDay({ habitId: habit.id, day }))
                  }
                  className={`px-2 py-1 rounded  border  ${
                    habit.completedDays.includes(day)
                      ? "bg-green-500 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
          )}
          {habit.frequency === "Weekly" && (
            <button
              onClick={() =>
                dispatch(toggleDay({ habitId: habit.id, day: "week" }))
              }
              className={`w-full mt-2 py-2 rounded  ${
                habit.completedDays.includes("week")
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-800"
              } `}
            >
              {habit.completedDays.includes("week")
                ? "✅ Done This Week"
                : "Mark as Done for Week"}
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default HabitList;
