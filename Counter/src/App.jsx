import React, { useState } from "react";

const App = () => {
  const [counter, setcounter] = useState(0);

  function Reload() {
    window.location.reload();
  }

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="flex flex-col w-[30%] h-[90%] bg-white rounded-xl shadow-lg p-2">
        <div className="flex justify-end mb-6">
          <img
            src="/refresh.png"
            alt="refresh-logo"
            onClick={() => { window.location.reload(); alert("🔄 The page will now refresh.") }}
            className="h-10 w-10 cursor-pointer"
          />
        </div>
        <div className=" h-[70%] w-[70%]  bg-gray-200 rounded-xl flex items-center justify-center text-6xl font-extrabold select-none ml-18  ">
          <h1>{counter}</h1>
        </div>
        <div className="flex justify-center gap-6 mt-6">
          <button
            onClick={() => {
              setcounter((prev) => prev + 1);
            }}
            className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-md text-xl font-semibold border border-green-700 h-10 w-12 cursor-pointer"
          >
            +
          </button>
          <button
            onClick={() =>
              counter > 0
                ? setcounter((prev) => prev - 1)
                : alert("⚠️ You are going to negative values!")
            }
            className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md text-xl font-semibold border border-red-700 h-10 w-12 cursor-pointer"
          >
            -
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
