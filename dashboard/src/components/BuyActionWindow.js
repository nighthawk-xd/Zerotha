import React, { useContext, useState } from "react";
import GeneralContext from "./GeneralContext";

const BuyActionWindow = ({ symbol, price, mode }) => {
  const { placeTrade, closeTradeWindow, cashBalance, portfolio } = useContext(GeneralContext);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");
  const [fieldError, setFieldError] = useState("");

  const holding = portfolio.find((item) => item.name === symbol);
  const availableShares = holding ? holding.qty : 0;
  const maxQty = mode === "BUY" ? Math.floor(cashBalance / price) : availableShares;

  const validateQuantity = (val) => {
    const num = Number(val);
    if (!Number.isInteger(num) || num < 1) return "Quantity must be at least 1.";
    if (num > 100000) return "Quantity cannot exceed 1,00,000.";
    if (mode === "BUY" && num > maxQty) return `Insufficient funds. Max you can buy: ${maxQty}.`;
    if (mode === "SELL" && num > availableShares) return `Not enough shares. Available: ${availableShares}.`;
    return "";
  };

  const handleQuantityChange = (event) => {
    const val = Number(event.target.value);
    setQuantity(val);
    setFieldError(validateQuantity(val));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const qtyErr = validateQuantity(quantity);
    if (qtyErr) {
      setFieldError(qtyErr);
      return;
    }
    try {
      placeTrade({ symbol, qty: quantity, price, side: mode.toUpperCase() });
      closeTradeWindow();
    } catch (err) {
      setError(err.message);
    }
  };

  const isDisabled = !!fieldError || quantity < 1;

  return (
    <div className="trade-modal-overlay">
      <div className="trade-modal">
        <div className="trade-modal-header">
          <h3>{mode === "BUY" ? "Buy" : "Sell"} {symbol}</h3>
          <button type="button" onClick={closeTradeWindow}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <label>
            Quantity
            <input
              type="number"
              min="1"
              max={maxQty}
              value={quantity}
              onChange={handleQuantityChange}
              style={fieldError ? { borderColor: '#e53935' } : {}}
            />
          </label>
          {fieldError && <p className="trade-error" style={{ color: '#e53935', fontSize: '0.82rem', margin: '4px 0 0' }}>{fieldError}</p>}

          <label>
            Price
            <input type="text" value={`₹${Number(price).toFixed(2)}`} readOnly />
          </label>

          <p>
            {mode === "BUY"
              ? `Available cash: ₹${cashBalance.toFixed(2)} · Max qty: ${maxQty}`
              : `Shares available: ${availableShares}`}
          </p>

          {error && <p className="trade-error">{error}</p>}

          <div className="trade-actions">
            <button type="button" onClick={closeTradeWindow} className="cancel-btn">
              Cancel
            </button>
            <button type="submit" className={mode === "BUY" ? "buy-btn" : "sell-btn"} disabled={isDisabled} style={isDisabled ? { opacity: 0.5, cursor: 'not-allowed' } : {}}>
              {mode === "BUY" ? "Place Buy" : "Place Sell"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuyActionWindow;
