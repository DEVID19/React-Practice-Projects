import AddHabit from "./components/AddHabit";
import HabitList from "./components/HabitList";

const App = () => {
  return (
    <div className=" max-w-7xl mx-auto item-center  justify-center p-4">
      <div className="bg-white shadow-md rounded-lg items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-center mb-4">
          Habit Tracker
        </h1>
        <AddHabit />
        <HabitList/>
      </div>
    </div>
  );
};

export default App;
