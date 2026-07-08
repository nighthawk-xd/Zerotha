import React, { useState } from "react";

const Coin = () => {
  const [selectedFund, setSelectedFund] = useState(null);
  
  const mutualFunds = [
    { name: "Axis Bluechip Fund", category: "Large Cap", returns: "12.5%", nav: "₹45.32" },
    { name: "Mirae Asset Large Cap Fund", category: "Large Cap", returns: "11.8%", nav: "₹52.15" },
    { name: "SBI Small Cap Fund", category: "Small Cap", returns: "18.2%", nav: "₹78.45" },
    { name: "Kotak Emerging Equity Fund", category: "Mid Cap", returns: "15.6%", nav: "₹62.30" },
    { name: "HDFC Flexi Cap Fund", category: "Flexi Cap", returns: "13.9%", nav: "₹1,245.50" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "20px", color: "#333" }}>
        Coin
      </h2>

      <div
        style={{
          background: "#fff",
          border: "1px solid #e6e6e6",
          borderRadius: "12px",
          padding: "30px",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ fontSize: "1.2rem", marginBottom: "15px", color: "#333" }}>
          Commission-Free Mutual Funds
        </h3>
        <p style={{ color: "#666", lineHeight: "1.6", marginBottom: "20px" }}>
          Buy direct mutual funds online, commission-free, delivered directly to your Demat account. Enjoy the investment experience on your Android and iOS devices.
        </p>

        <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
          <div style={{ padding: "15px", background: "#e8f5e9", borderRadius: "8px", flex: "1" }}>
            <h4 style={{ fontSize: "1.5rem", marginBottom: "5px", color: "#2e7d32" }}>0%</h4>
            <p style={{ fontSize: "0.85rem", color: "#666" }}>Commission</p>
          </div>
          <div style={{ padding: "15px", background: "#e3f2fd", borderRadius: "8px", flex: "1" }}>
            <h4 style={{ fontSize: "1.5rem", marginBottom: "5px", color: "#1565c0" }}>4000+</h4>
            <p style={{ fontSize: "0.85rem", color: "#666" }}>Mutual Funds</p>
          </div>
          <div style={{ padding: "15px", background: "#fff3e0", borderRadius: "8px", flex: "1" }}>
            <h4 style={{ fontSize: "1.5rem", marginBottom: "5px", color: "#e65100" }}>Direct</h4>
            <p style={{ fontSize: "0.85rem", color: "#666" }}>To Demat</p>
          </div>
        </div>
      </div>

      <div
        style={{
          background: "#fff",
          border: "1px solid #e6e6e6",
          borderRadius: "12px",
          padding: "30px",
        }}
      >
        <h3 style={{ fontSize: "1.2rem", marginBottom: "15px", color: "#333" }}>
          Popular Mutual Funds
        </h3>
        
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #e6e6e6" }}>
                <th style={{ padding: "12px", textAlign: "left", color: "#666", fontSize: "0.9rem" }}>Fund Name</th>
                <th style={{ padding: "12px", textAlign: "left", color: "#666", fontSize: "0.9rem" }}>Category</th>
                <th style={{ padding: "12px", textAlign: "right", color: "#666", fontSize: "0.9rem" }}>Returns</th>
                <th style={{ padding: "12px", textAlign: "right", color: "#666", fontSize: "0.9rem" }}>NAV</th>
                <th style={{ padding: "12px", textAlign: "center", color: "#666", fontSize: "0.9rem" }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {mutualFunds.map((fund, index) => (
                <tr key={index} style={{ borderBottom: "1px solid #f0f0f0" }}>
                  <td style={{ padding: "12px", color: "#333", fontSize: "0.9rem" }}>{fund.name}</td>
                  <td style={{ padding: "12px", color: "#666", fontSize: "0.85rem" }}>{fund.category}</td>
                  <td style={{ padding: "12px", textAlign: "right", color: "#2e7d32", fontSize: "0.9rem", fontWeight: "500" }}>{fund.returns}</td>
                  <td style={{ padding: "12px", textAlign: "right", color: "#333", fontSize: "0.9rem" }}>{fund.nav}</td>
                  <td style={{ padding: "12px", textAlign: "center" }}>
                    <button
                      style={{
                        padding: "6px 12px",
                        background: "#4184f3",
                        color: "#fff",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer",
                        fontSize: "0.8rem",
                      }}
                      onClick={() => alert(`Invest in ${fund.name} - Coming soon!`)}
                    >
                      Invest
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: "20px", padding: "15px", background: "#fff3e0", borderRadius: "8px", border: "1px solid #ffe0b2" }}>
          <p style={{ fontSize: "0.85rem", color: "#e65100", margin: 0 }}>
            <strong>Note:</strong> This is a demo interface. Actual mutual fund investments require KYC verification and compliance checks.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Coin;
