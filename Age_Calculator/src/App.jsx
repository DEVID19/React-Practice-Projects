import { useState } from "react";

const App = () => {
  const [age, setAge] = useState({ years: 0, months: 0, days: 0 });
  const [birth, setBirth] = useState("");

  function CalculateAge() {
    let birthdate = new Date(birth);
    let todaydate = new Date();
    if (!birth) return;

    // get current birth date

    let currentYear = todaydate.getFullYear();
    let currentMonth = todaydate.getMonth();
    let currentDate = todaydate.getDate();

    // get birth dates

    let birthYear = birthdate.getFullYear();
    let birthMonth = birthdate.getMonth();
    let birthDate = birthdate.getDate();

    let UserAgeInYears = currentYear - birthYear;
    let UserAgeInMonths = currentMonth - birthMonth;
    let UserAgeInDays = currentDate - birthDate;

    if (UserAgeInMonths < 0 || (UserAgeInMonths === 0 && UserAgeInDays < 0)) {
      UserAgeInYears--;
      UserAgeInMonths += 12;
    }

    if (UserAgeInDays < 0) {
      // Get days in previous month
      const prevMonth = new Date(currentYear, currentMonth, 0);
      UserAgeInDays += prevMonth.getDate();
      UserAgeInMonths--;
    }

    setAge({
      years: UserAgeInYears,
      months: UserAgeInMonths,
      days: UserAgeInDays,
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5] p-4">
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-2xl ">
        <div className="flex flex-col item-center justify-center  gap-1 flex-wrap">
          <h1 className="text-center  text-4xl font-bold ">Age Calculator</h1>
          <p className="text-center text-md font-md ">
            The Age Calculator helps to calculate the age accurately.
          </p>
        </div>
        <div className="flex flex-col justify-between items-center gap-6 md:flex-row mt-5">
          <div className="flex flex-col items-center gap-2 ">
            <h3 className="text-2xl font-bold ">Date of Birth </h3>
            <input
              type="date"
              value={birth}
              onChange={(e) => {
                setBirth(e.target.value);
              }}
              className="border-2 border-gray-300 p-2 rounded-md"
            />
            <div className="flex items-center justify-center gap-1 flex-row ">
              <button
                className="text-center  text-white bg-blue-400 rounded-md p-2 cursor-pointer font-md"
                onClick={() => CalculateAge()}
              >
                Calculate age
              </button>
              <button
                className="text-center p-2 text-white bg-blue-400 rounded-md  cursor-pointer text-md font-md"
                onClick={() => {
                  setBirth("");
                  setAge({ years: 0, months: 0, days: 0 });
                }}
              >
                Reset
              </button>
            </div>
          </div>
          <div className="flex flex-col  gap-2 bg-gray-300 w-full sm:w-96 p-2 items-center justify-center rounded-md ">
            <h3 className="text-2xl font-semibold ">Your Age is</h3>
            <h2 className="text-3xl  font-bold text-green-700">
              {age.years} yr,{age.months}mon,{age.days} day
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
