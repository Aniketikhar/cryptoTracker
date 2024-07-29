import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { coinContext } from "../../context/coinContext";
import { Link } from "react-router-dom";

const Home = () => {
  const { allCoin, currency } = useContext(coinContext);
  const [displayCoin, setDisplayCoin] = useState();
  const [input, setInput] = useState();
  const [loading, setLoading]= useState(true);

  useEffect(() => {
    setDisplayCoin(allCoin);
    setLoading(false);
  }, [allCoin]);

  function handleChange(event) {
    setInput(event.target.value);

    if (event.target.value == "") {
      setDisplayCoin(allCoin);
      return;
    }
  }

  async function searchHandler(event) {
    event.preventDefault();

    const coins = await allCoin.filter((item) =>
      item.name.toLowerCase().includes(input.toLowerCase())
    );

    setDisplayCoin(coins);
  }

  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br /> Crypto Market Place
        </h1>
        <p>
          Welcome to the world's largest crypto currency marketplace. Sign up to
          exlore more about cryptos.
        </p>
        <form onSubmit={searchHandler}>
          <input
            type="text"
            name=""
            list="coinList"
            value={input}
            required
            onChange={handleChange}
            placeholder="Search crypto"
            id=""
          />
          <datalist id="coinList">
            {allCoin.map((coin, index) => (
              <option value={coin.name} key={index} />
            ))}
          </datalist>
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p style={{ textAlign: "left", paddingLeft: "40px" }}>Coins</p>
          <p>Price</p>
          <p>24H Change</p>
          <p className="market-cap">Market Cap</p>
        </div>
        {
          loading == true ? (
            <div className="spinner">
              <div className="spin"></div>
            </div>
          ) : 
          displayCoin?.slice(0, 10).map((coin, index) => {
          return (
            <Link
              to={`/coin/${coin.id}`}
              className="table-layout"
              key={coin.id}
            >
              <p>{coin.market_cap_rank}</p>
              <div
                className=""
                style={{ display: "flex", paddingLeft: "20px", gap: "10px" }}
              >
                <img src={coin.image} width={30} alt="" />
                <p>{coin.name + " - " + coin.symbol}</p>
              </div>

              <p>{currency.symbol} {coin.current_price.toLocaleString()}</p>
              <p
                className={
                  coin.price_change_percentage_24h > 0 ? "green" : "red"
                }
              >
                {(
                  Math.floor(coin.price_change_percentage_24h * 100) / 100
                ).toFixed(2)}
              </p>
              <p className="market-cap">
                {currency.symbol} {coin.market_cap.toLocaleString()}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Home;
