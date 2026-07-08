import React, { useContext } from "react";
import GeneralContext from "./GeneralContext";
import VerticalGraph from "./VerticalGraph";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  }).format(value);

const Summary = () => {
  const { portfolio, cashBalance } = useContext(GeneralContext);
  const holdings = portfolio || [];

  const totalInvestment = holdings.reduce((sum, stock) => sum + Number(stock.avg || 0) * Number(stock.qty || 0), 0);
  const currentValue = holdings.reduce((sum, stock) => sum + Number(stock.price || 0) * Number(stock.qty || 0), 0);
  const pnl = currentValue - totalInvestment;
  const pnlPercent = totalInvestment > 0 ? (pnl / totalInvestment) * 100 : 0;
  const isProfit = pnl >= 0;
  const equityValue = currentValue + cashBalance;

  return (
    <>
      <div className="username">
        <h6>Hi, User!</h6>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>{formatCurrency(equityValue)}</h3>
            <p>Available equity value</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Available cash <span>₹{formatCurrency(cashBalance)}</span>{" "}
            </p>
            <p>
              Holdings value <span>₹{formatCurrency(currentValue)}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <div className="section">
        <span>
          <p>Holdings ({holdings.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={isProfit ? "profit" : "loss"}>
              ₹{formatCurrency(pnl)} <small>{pnlPercent >= 0 ? "+" : ""}{pnlPercent.toFixed(2)}%</small>{" "}
            </h3>
            <p>P&L</p>
          </div>
          <hr />

          <div className="second">
            <p>
              Current Value <span>₹{formatCurrency(currentValue)}</span>{" "}
            </p>
            <p>
              Investment <span>₹{formatCurrency(totalInvestment)}</span>{" "}
            </p>
          </div>
        </div>
        <hr className="divider" />
      </div>

      <VerticalGraph holdings={holdings} />
    </>
  );
};

export default Summary;
