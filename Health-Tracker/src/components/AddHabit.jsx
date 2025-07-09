import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addHabit } from "../app/habitSlice";

const AddHabit = () => {
  const [title, settitle] = useState("");
  const [frequency, setFrequency] = useState("Daily");
  const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim() === "" || frequency.trim() === "") {
            alert("Please fill in all fields");
            return; 
        }
        dispatch(addHabit({ title, frequency }))
        settitle("");
        setFrequency("Daily");
    }
    
  return (
    <div>
      <form action="" className="flex flex-col gap-2 " onSubmit={handleSubmit}>
        <h2 className="font-semibold font-xl">Add new Habit </h2>
        <input
          type="text"
          value={title}
          onChange={(e) => settitle(e.target.value)}
          placeholder="Enter the habit "
          className="w-full border rounded-md mb-3  p-2  "
        />
        <select
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className="w-full border rounded-md mb-3 p-2"
        >
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly </option>
        </select>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          Add Habit
        </button>
      </form>
    </div>
  );
};

export default AddHabit;
