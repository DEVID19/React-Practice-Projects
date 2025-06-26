import { useEffect, useState } from "react";

const App = () => {
  const [amount, setAmount] = useState(1);
  const [currencyFrom, setCurrencyFrom] = useState("USD");
  const [currencyto, setCurrencyTo] = useState("INR");
  const [exchange, setExchange] = useState(null);
  const [currencyList, setCurrencyList] = useState([]);

  useEffect(() => {
    const fetchCurrencyList = async () => {
      try {
        const response = await fetch("https://api.frankfurter.app/currencies");
        const data = await response.json();
        setCurrencyList(Object.keys(data));
      } catch (error) {
        console.error("Failed to fetch currency list:", error);
      }
    };
    fetchCurrencyList();
  }, []);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        if (currencyFrom === currencyto) {
          setExchange(amount);
          return;
        }

        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${currencyFrom}&to=${currencyto}`
        );

        const data = await res.json();

        const rate = data.rates[currencyto];

        setExchange(amount * rate);
      } catch (error) {
        console.error("Failed to fetch exchange rates:", error);
        setExchange(null);
      }
    };
    fetchRates();
  }, [amount, currencyFrom, currencyto]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5] p-4">
      <div className="bg-white shadow-md rounded-2xl p-6 w-full max-w-2xl ">
        <div className="flex flex-col gap-1    ">
          <img src="/money-exchange.png" alt="logo" className="h-20 w-20" />
          <h1 className="text-2xl font-bold">Currency Converter</h1>
        </div>
        <div className="flex flex-wrap gap-6 mt-6 ">
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-md text-gray-800 font-sm">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              name="amount"
              className="  border-2  p-2 rounded-md h-10  w-40"
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-md text-gray-800 font-sm">
              Currencyfrom
            </label>
            <select
              name="currencyFrom"
              id="currencyFrom"
              className="  border-2 rounded-md h-10  w-40"
              value={currencyFrom}
              onChange={(e) => {
                setCurrencyFrom(e.target.value);
              }}
            >
              {currencyList.length === 0 ? (
                <option disabled>Loading...</option>
              ) : (
                currencyList.map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))
              )}
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-md text-gray-800 font-sm">
              Currencyto
            </label>
            <select
              name="currencyTo"
              id="currencyTo"
              className="border-2 rounded-md h-10  w-40"
              value={currencyto}
              onChange={(e) => {
                setCurrencyTo(e.target.value);
              }}
            >
              {currencyList.length === 0 ? (
                <option disabled>Loading...</option>
              ) : (
                currencyList.map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>
        <div className="flex mt-10 bg-gray-300 p-4 w-fit rounded-lg">
          <h3 className="text-2xl font-medium">
            Conversion is:{" "}
            {exchange !== null ? exchange.toFixed(2) : "Loading..."}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default App;
