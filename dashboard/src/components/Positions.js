import React, { useContext, useEffect, useRef, useState } from "react";
import GeneralContext from "./GeneralContext";

const Positions = () => {
  const { portfolio } = useContext(GeneralContext);
  const positions = (portfolio || []).map((stock) => ({ ...stock, product: "CNC" }));

  return (
    <>
      <h3 className="title">Positions ({positions.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
            </tr>
          </thead>
          <tbody>
            {positions.length === 0 ? (
              <tr>
                <td colSpan="6">No positions found.</td>
              </tr>
            ) : (
              positions.map((stock, index) => (
                <PositionRow key={stock.name || index} stock={stock} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

const PositionRow = ({ stock }) => {
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
      <td>{stock.product}</td>
      <td>{stock.name}</td>
      <td>{stock.qty}</td>
      <td>₹{Number(stock.avg).toFixed(2)}</td>
      <td className={tickClass}>₹{Number(stock.price).toFixed(2)}</td>
      <td className={profClass}>₹{stockPnl.toFixed(2)}</td>
    </tr>
  );
};

export default Positions;
