import React, { useEffect, useState } from "react";
import axios from "axios";

const getAuthHeaders = () => ({
  headers: { Authorization: "Bearer " + localStorage.getItem("token") },
});

const UPI_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/;
const OTP_REGEX = /^\d{4,8}$/;

const Funds = () => {
  const [mode, setMode] = useState("ADD");
  const [amount, setAmount] = useState(1000);
  const [upi, setUpi] = useState("");
  const [otp, setOtp] = useState("");
  const [cashBalance, setCashBalance] = useState(50000);
  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState("");
  const [processing, setProcessing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL || ''}/balance`, getAuthHeaders());
        setCashBalance(Number(response.data?.amount ?? 50000));
      } catch (err) {
        setCashBalance(50000);
      }
    };

    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL || ''}/fund-transactions`, getAuthHeaders());
        setTransactions(response.data || []);
      } catch (err) {
        setTransactions([]);
      }
    };

    fetchBalance();
    fetchTransactions();
  }, []);

  const openModal = (selectedMode) => {
    setMode(selectedMode);
    setMessage("");
    setAmount(1000);
    setUpi("");
    setOtp("");
    setFieldErrors({});
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setProcessing(false);
    setMessage("");
    setFieldErrors({});
  };

  const validateForm = () => {
    const errs = {};
    const numAmount = Number(amount);

    if (!numAmount || numAmount < 100) errs.amount = "Minimum amount is ₹100.";
    else if (numAmount > 10000000) errs.amount = "Amount cannot exceed ₹1,00,00,000.";
    else if (mode === "WITHDRAW" && numAmount > cashBalance) errs.amount = `Insufficient balance. Available: ₹${cashBalance.toFixed(2)}`;

    if (upi && !UPI_REGEX.test(upi)) errs.upi = "Invalid UPI format. Expected: user@provider";

    if (mode === "WITHDRAW") {
      if (!otp.trim()) errs.otp = "OTP is required for withdrawals.";
      else if (!OTP_REGEX.test(otp.trim())) errs.otp = "OTP must be 4 to 8 digits.";
    }

    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    setProcessing(true);
    setMessage("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      const response = await axios.post(`${process.env.REACT_APP_API_URL || ''}/fund-transactions`, {
        type: mode,
        amount: Number(amount),
        upi,
        otp,
      }, getAuthHeaders());

      const nextAmount = response.data?.balance ?? (mode === "ADD"
        ? cashBalance + Number(amount)
        : cashBalance - Number(amount));

      setCashBalance(Number(nextAmount));
      setTransactions((prev) => [response.data.transaction, ...prev]);
      setMessage(`${mode === "ADD" ? "Added" : "Withdrawn"} ₹${Number(amount).toFixed(2)} successfully.`);
      setAmount(1000);
      setUpi("");
      setOtp("");
      setFieldErrors({});
      setTimeout(closeModal, 1200);
    } catch (err) {
      const serverMsg = err.response?.data?.message || err.message || "Transaction failed. Please try again.";
      setMessage(serverMsg);
      if (err.response?.data?.errors) {
        setFieldErrors((p) => ({ ...p, ...err.response.data.errors }));
      }
    } finally {
      setProcessing(false);
    }
  };

  const errStyle = { color: '#e53935', fontSize: '0.8rem', margin: '2px 0 0' };

  return (
    <>
      <div className="funds">
        <p>Instant, zero-cost fund transfers with UPI</p>
        <button className="btn btn-green" onClick={() => openModal("ADD")}>Add funds</button>
        <button className="btn btn-blue" onClick={() => openModal("WITHDRAW")}>Withdraw</button>
      </div>

      <div className="row">
        <div className="col">
          <div className="table">
            <div className="data">
              <p>Available cash</p>
              <p className="imp colored">₹{cashBalance.toFixed(2)}</p>
            </div>
            <div className="data">
              <p>Processing</p>
              <p>{processing ? "In progress..." : "Ready"}</p>
            </div>
          </div>

          {isModalOpen && (
            <div className="trade-modal-overlay">
              <div className="trade-modal">
                <div className="trade-modal-header">
                  <h4>{mode === "ADD" ? "Add funds" : "Withdraw funds"}</h4>
                  <button type="button" onClick={closeModal}>×</button>
                </div>
                <form onSubmit={handleSubmit}>
                  <label>
                    Amount (₹)
                    <input
                      type="number"
                      min="100"
                      max="10000000"
                      value={amount}
                      onChange={(event) => { setAmount(Number(event.target.value)); setFieldErrors((p) => ({ ...p, amount: '' })); }}
                      style={fieldErrors.amount ? { borderColor: '#e53935' } : {}}
                    />
                  </label>
                  {fieldErrors.amount && <p style={errStyle}>{fieldErrors.amount}</p>}

                  <label>
                    UPI ID (optional)
                    <input
                      type="text"
                      value={upi}
                      onChange={(event) => { setUpi(event.target.value); setFieldErrors((p) => ({ ...p, upi: '' })); }}
                      placeholder="user@upi"
                      style={fieldErrors.upi ? { borderColor: '#e53935' } : {}}
                    />
                  </label>
                  {fieldErrors.upi && <p style={errStyle}>{fieldErrors.upi}</p>}

                  {mode === "WITHDRAW" && (
                    <>
                      <label>
                        OTP
                        <input
                          type="text"
                          value={otp}
                          onChange={(event) => { setOtp(event.target.value); setFieldErrors((p) => ({ ...p, otp: '' })); }}
                          placeholder="Enter OTP (4-8 digits)"
                          maxLength={8}
                          style={fieldErrors.otp ? { borderColor: '#e53935' } : {}}
                        />
                      </label>
                      {fieldErrors.otp && <p style={errStyle}>{fieldErrors.otp}</p>}
                    </>
                  )}

                  <button type="submit" className={mode === "ADD" ? "buy-btn" : "sell-btn"} disabled={processing}>
                    {processing ? "Processing..." : mode === "ADD" ? "Add funds" : "Withdraw funds"}
                  </button>
                  {message && <p className={message.includes("success") ? "profit" : "loss"}>{message}</p>}
                </form>
              </div>
            </div>
          )}
        </div>

        <div className="col">
          <div className="commodity">
            <h4>Recent transactions</h4>
            <div className="table">
              {transactions.length === 0 ? (
                <p>No recent activity.</p>
              ) : (
                transactions.slice(0, 5).map((transaction, index) => (
                  <div className="data" key={index}>
                    <p>{transaction.type === "ADD" ? "Added" : "Withdraw"}</p>
                    <p>₹{Number(transaction.amount).toFixed(2)}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Funds;
