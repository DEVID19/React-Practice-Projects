import React, { useState } from "react";

const App = () => {
  const [weight, setWeight] = useState(0);
  const [height, setHeight] = useState(0);
  const [message, setMessage] = useState("Enter the input");
  const [bmi, setBmi] = useState(0);

  let CalcBmi = (e) => {
    e.preventDefault();

    if (weight === 0 || height === 0) {
      alert("Enter valid weight and height");
    } else {
      let bmi = (weight / (height * height)) * 703;
      setBmi(bmi.toFixed(1));
    }

    if (bmi <= 25) {
      setMessage("You Are UnderWeight");
    } else if (bmi >= 25 && bmi < 30) {
      setMessage("Yor are fit and fine ");
    } else {
      setMessage("You are overweight ");
    }
  };

  let reload = () => {
    window.location.reload();
  };

  return (
    <div className="h-[100%] w-[20%] flex item-center justify-center border border-transparent shadow-2xl mt-[10%] ml-[40%]   pt-6 pl-1 pr-1 pb-6 ">
      <div>
        <h1 className="text-2xl font-bold "> BMI CALCULATOR </h1>
        <form onSubmit={CalcBmi}>
          <div className="flex flex-col gap-1 mt-3 ">
            <label className="text-md font-normal"> Weight (lbs)</label>
            <input
              type="text"
              placeholder="Enter Weight in lbs"
              value={weight}
              onChange={(e) => {
                setWeight(e.target.value);
              }}
              className="border border-black w-60 p-0.5 pl-2 rounded-sm"
            />
          </div>
          <div className="flex flex-col gap-1 mt-1 ">
            <label className="text-md font-normal"> Height (in)</label>
            <input
              type="text"
              placeholder="Enter Weight in lbs"
              value={height}
              onChange={(e) => {
                setHeight(e.target.value);
              }}
              className="border border-black w-60 p-0.5 pl-2 rounded-sm"
            />
          </div>
          <div className="flex flex-col gap-2 mt-3">
            <button type="submit" className="border border-gray-400 w-60 bg-blue-500 p-1 rounded-sm cursor-pointer " >submit</button>
            <button type="submit" onClick={reload} className="border border-gray-400 w-60 bg-gray-100 p-1 rounded-sm cursor-pointer ">
              Reload
            </button>
          </div>
          <div className="mt-3  flex flex-col  text-center">
            <h3 className="mr-10 font-bold" >Your BMI is : {bmi}</h3>
            <p className="mr-10 text-sm text-gray-900">{message}</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
