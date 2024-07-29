import React, { createContext, useState, useEffect } from "react";

// Create the context
const coinContext = createContext();

export default function CoinContextState({ children }) {
  const [allCoin, setAllCoin] = useState([]);
  const [currency, setCurrency] = useState({
    name: "inr",
    symbol: "₹",
  });

  const fetchAllCoin = async () => {
    const url =
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`;
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-jhu38rqFsLUUkpEsiMvacWMM",
      },
    };
    try {
      const apiResponse = await fetch(url, options);

      if (!apiResponse.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await apiResponse.json();

      if (result.length > 0) {
        setAllCoin(result);
      }
    } catch (error) {
      console.error("Failed to fetch coins:", error);
    }
  };

  useEffect(() => {
    fetchAllCoin();
  }, []);

  return (
    <coinContext.Provider value={{ currency, setCurrency, allCoin }}>
      {children}
    </coinContext.Provider>
  );
}

export { coinContext };
