import { useEffect, useState } from "react";

const App = () => {
  const [weatherData, setWeatherData] = useState("");
  const [city, setCity] = useState("Delhi");

  const CurrentDate = new Date();
  const CurrentMonth = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const month = CurrentMonth[CurrentDate.getMonth()];
  const day = CurrentDate.getDate();
  const year = CurrentDate.getFullYear();

  const formatedDate = `${month} , ${day} ${year}`;

  const apikey = "6efad21fe82a1d4aa56bcd410c783ba9";

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`
      );
      const data = await response.json();
      setWeatherData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const handleInputChange = (e) => {
    setCity(e.target.value);
    console.log(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    fetchWeatherData(); // call your API function here
  };
  const getWeatherIconUrl = (main) => {
    switch (main) {
      case "Clouds":
        return "/thunder.png"; 
      case "Rain":
        return "/rain_with_cloud.png"; 
      case "Mist":
        return "/Tornado.png"; 
      case "Haze":  
        return "/sun.png"; 
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-blue-500 shadow-md rounded-2xl p-6 w-full max-w-md">
        {weatherData && (
          <>
        <div className="flex flex-col items-center justify-center text-center gap-2   ">
          <p className="text-gray-300 text-md">{formatedDate}</p>
          <h1 className="text-2xl  text-white font-semibold ">{weatherData.name}</h1>
        </div>
        <div className="flex item-center justify-center text-center">
              <img
                src={getWeatherIconUrl(weatherData.weather[0].main)}
                alt="sun-image "
                className="h-30 w-30" />
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-white ">{weatherData.main.temp}</h1>
          <p className="text-md text-white font-medium ">{weatherData.weather[0].main} </p>
        </div>
        <form
          onSubmit={handleFormSubmit}
          action=""
          className="flex items-center justify-center  mt-2"
        >
          <input
            type="text"
            placeholder="Enter city name"
            className="rounded-l-full px-4 py-2 text-sm bg-gray-200 outline-none"
            onChange={handleInputChange}
          />
          <button className="rounded-r-full px-4 py-2 text-sm bg-gray-100 font-medium cursor-pointer">
            Get
          </button>
            </form>
            </>
        )}
      </div>
    </div>
  );
};

export default App;
