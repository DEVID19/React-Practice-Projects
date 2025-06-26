import React, { useState } from "react";

const App = () => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [add, setAdd] = useState(0);

  function calsum(e) {
    e.preventDefault();
    if (num1 < 0 || num2 < 0) {
      alert("Enter valid number");
    } else {
      setAdd(Number(num1) + Number(num2)); // ensure correct addition
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
          Sum Calculator
        </h2>
        <form onSubmit={calsum} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="num1" className="mb-1 text-gray-700 font-medium">
              Number 1
            </label>
            <input
              type="text"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="num2" className="mb-1 text-gray-700 font-medium">
              Number 2
            </label>
            <input
              type="text"
              value={num2}
              onChange={(e) => setNum2(e.target.value)}
              className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <button
              onClick={calsum}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
        <div className="mt-4 text-center">
          <h4 className="text-lg font-medium text-gray-800">
            The sum is {add}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default App;
