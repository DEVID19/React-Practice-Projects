import React from "react";
import { useTheme } from "./context/ThemeContext";

const App = () => {
  const { theme, ToggleTheme } = useTheme();

  return (
    <div className="Main-container">
      <div className="card">
        <h1 className="  ">You are in the {theme} Mode </h1>
        <img
          src={theme === "light" ? "/sun.png" : "/moon-1.png"}
          alt="sunimage"
          className="h-20 w-20 "
        />
        <button
          className=" "
          onClick={ToggleTheme}
        >
          Toggle
        </button>
      </div>
    </div>
  );
};

export default App;
