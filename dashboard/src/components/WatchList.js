import React, { useContext, useState, useEffect, useRef } from "react";
import { Grow, Tooltip } from "@mui/material";
import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";

import GeneralContext from "./GeneralContext";
import DonutChart from "./DonutChart";

const WatchList = () => {
  const { portfolio, liveWatchlist } = useContext(GeneralContext);
  const holdings = portfolio || [];

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <span className="counts"> {liveWatchlist.length} / 50</span>
      </div>

      <ul className="list">
        {liveWatchlist.map((stock, index) => {
          return <WatchListItem stock={stock} key={stock.name || index} />;
        })}
      </ul>

      <DonutChart holdings={holdings} />
    </div>
  );
};

export default WatchList;

const WatchListItem = ({ stock }) => {
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);
  const [tickClass, setTickClass] = useState("");
  const prevPriceRef = useRef(stock.price);

  // Flash green/red on price change
  useEffect(() => {
    if (stock.price !== prevPriceRef.current) {
      const cls = stock.price > prevPriceRef.current ? "tick-up" : "tick-down";
      setTickClass(cls);
      prevPriceRef.current = stock.price;
      const timer = setTimeout(() => setTickClass(""), 600);
      return () => clearTimeout(timer);
    }
  }, [stock.price]);

  return (
    <li
      onMouseEnter={() => setShowWatchlistActions(true)}
      onMouseLeave={() => setShowWatchlistActions(false)}
    >
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>
        <div className="itemInfo">
          <span className={`percent ${stock.isDown ? "down" : "up"}`}>
            {stock.percent}
          </span>
          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}
          <span className={`price ${tickClass}`}>
            {Number(stock.price).toFixed(2)}
          </span>
        </div>
      </div>
      {showWatchlistActions && <WatchListActions stock={stock} />}
    </li>
  );
};

const WatchListActions = ({ stock }) => {
  const generalContext = useContext(GeneralContext);

  const handleTradeClick = (mode) => {
    generalContext.openTradeWindow({
      symbol: stock.name,
      price: stock.price,
      mode,
    });
  };

  return (
    <span className="actions">
      <span>
        <Tooltip title="Buy (B)" placement="top" arrow TransitionComponent={Grow}>
          <button className="buy" onClick={() => handleTradeClick("BUY")}>
            Buy
          </button>
        </Tooltip>
        <Tooltip title="Sell (S)" placement="top" arrow TransitionComponent={Grow}>
          <button className="sell" onClick={() => handleTradeClick("SELL")}>
            Sell
          </button>
        </Tooltip>
        <Tooltip title="Analytics (A)" placement="top" arrow TransitionComponent={Grow}>
          <button className="action">
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>
        <Tooltip title="More" placement="top" arrow TransitionComponent={Grow}>
          <button className="action">
            <MoreHoriz className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};
