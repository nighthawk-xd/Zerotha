import React, { useContext, useEffect, useRef, useState } from "react";
import GeneralContext from "./GeneralContext";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(value);

const Holdings = () => {
  const { portfolio, cashBalance, openTradeWindow } = useContext(GeneralContext);
  const holdings = portfolio || [];

  const totalInvestment = holdings.reduce((sum, stock) => sum + stock.avg * stock.qty, 0);
  const currentValue = holdings.reduce((sum, stock) => sum + stock.price * stock.qty, 0);
  const pnl = currentValue - totalInvestment;

  return (
    <>
      <h3 className="title">Holdings ({holdings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {holdings.length === 0 ? (
              <tr>
                <td colSpan="7">No holdings found.</td>
              </tr>
            ) : (
              holdings.map((stock, index) => (
                <HoldingRow
                  key={stock.name || index}
                  stock={stock}
                  openTradeWindow={openTradeWindow}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="row">
        <div className="col">
          <h5>₹{formatCurrency(totalInvestment)}</h5>
          <p>Total investment</p>
        </div>
        <div className="col">
          <h5>₹{formatCurrency(currentValue)}</h5>
          <p>Current value</p>
        </div>
        <div className="col">
          <h5>₹{formatCurrency(cashBalance)}</h5>
          <p>Available cash</p>
        </div>
      </div>
    </>
  );
};

const HoldingRow = ({ stock, openTradeWindow }) => {
  const [tickClass, setTickClass] = useState("");
  const prevPriceRef = useRef(stock.price);

  useEffect(() => {
    if (stock.price !== prevPriceRef.current) {
      const cls = stock.price > prevPriceRef.current ? "tick-up" : "tick-down";
      setTickClass(cls);
      prevPriceRef.current = stock.price;
      const timer = setTimeout(() => setTickClass(""), 600);
      return () => clearTimeout(timer);
    }
  }, [stock.price]);

  const curValue = stock.price * stock.qty;
  const stockPnl = curValue - stock.avg * stock.qty;
  const isProfit = stockPnl >= 0;
  const profClass = isProfit ? "profit" : "loss";

  return (
    <tr>
      <td>{stock.name}</td>
      <td>{stock.qty}</td>
      <td>₹{formatCurrency(stock.avg)}</td>
      <td className={tickClass}>₹{formatCurrency(stock.price)}</td>
      <td>₹{formatCurrency(curValue)}</td>
      <td className={profClass}>₹{formatCurrency(stockPnl)}</td>
      <td>
        <button
          type="button"
          className="sell"
          onClick={() =>
            openTradeWindow({
              symbol: stock.name,
              price: stock.price,
              mode: "SELL",
            })
          }
        >
          Sell
        </button>
      </td>
    </tr>
  );
};

export default Holdings;
