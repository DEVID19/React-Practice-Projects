import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    try {
      const storedTheme = localStorage.getItem("Theme");
      if (storedTheme) {
        setTheme(storedTheme);
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(storedTheme);
      }
    } catch (error) {
      console.log(error, "errror occur in storing  the theme");
    }
  }, []);

  function ToggleTheme() {
    const newtheme = theme === "light" ? "dark" : "light";

    document.documentElement.classList.remove(theme);
    document.documentElement.classList.add(newtheme);

    setTheme(newtheme);
    localStorage.setItem("Theme", newtheme);
  }

  return (
    <ThemeContext.Provider value={{ theme, ToggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
