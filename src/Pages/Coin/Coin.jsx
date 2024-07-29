import React, { useContext, useEffect, useMemo, useState } from "react";
import "./Coin.css";
import { coinContext } from "../../context/coinContext";
import { useParams } from "react-router-dom";
import LineChart from "../../components/LineChart/LineChart";

const Coin = () => {
  const { allCoin, currency } = useContext(coinContext);
  const [coin, setCoin] = useState();
  const [historicalData, setHistoricalData] = useState([]);
  const params = useParams();
  const [loading, setLoading] = useState(true);

  async function getHistoricalData() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": "CG-jhu38rqFsLUUkpEsiMvacWMM",
      },
    };

    fetch(
      `https://api.coingecko.com/api/v3/coins/${params.coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`,
      options
    )
      .then((response) => response.json())
      .then((response) => setHistoricalData(response))
      .catch((err) => console.error(err))
  
  }

  async function getCoin() {
    const url = `https://api.coingecko.com/api/v3/coins/${params.coinId}`;
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

      if (result) {
        setCoin(result);
        setLoading(false);
      }
    } catch (error) {
      console.error("Failed to fetch coins:", error);
    }
  }
  useEffect(() => {
    getCoin();
    getHistoricalData();
  }, [currency]);

  return (
    <div className="coin">
      {loading == true ? (
        <div className="spinner">
          <div className="spin"></div>
        </div>
      ) :
      <>
        <div className="coin-name">
          <img src={coin?.image.large} alt="" />
          <p>
            <b>
              {coin?.name} ({coin?.symbol.toUpperCase()})
            </b>
          </p>
        </div>
        <div className="coin-chart">
          <LineChart historicalData={historicalData} />
        </div>
        <div className="coin-info">
          <ul>
            <li>Crypto Market Rank</li>
            <li>{coin?.market_cap_rank}</li>
          </ul>
          <ul>
            <li>Crypto price</li>
            <li>
              {currency.symbol}{" "}
              {coin?.market_data.current_price[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>Market Cap</li>
            <li>
              {currency.symbol}{" "}
              {coin?.market_data.market_cap[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24H High</li>
            <li>
              {currency.symbol}{" "}
              {coin?.market_data.high_24h[currency.name].toLocaleString()}
            </li>
          </ul>
          <ul>
            <li>24H Low</li>
            <li>
              {currency.symbol}{" "}
              {coin?.market_data.low_24h[currency.name].toLocaleString()}
            </li>
          </ul>
        </div>
      </> }
    </div>
  );
};

export default Coin;
