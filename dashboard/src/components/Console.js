import React from "react";

const Console = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "20px", color: "#333" }}>
        Console
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
          Account Dashboard
        </h3>
        <p style={{ color: "#666", lineHeight: "1.6", marginBottom: "20px" }}>
          The central dashboard for your Zerodha account. Gain insights into your trades and investments with in-depth reports and visualisations.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
          <div style={{ padding: "20px", background: "#f5f5f5", borderRadius: "8px" }}>
            <h4 style={{ fontSize: "1rem", marginBottom: "10px", color: "#333" }}>
              Account Overview
            </h4>
            <p style={{ fontSize: "0.9rem", color: "#666" }}>
              View your complete account summary including balance, holdings, and performance metrics.
            </p>
          </div>

          <div style={{ padding: "20px", background: "#f5f5f5", borderRadius: "8px" }}>
            <h4 style={{ fontSize: "1rem", marginBottom: "10px", color: "#333" }}>
              Trade Reports
            </h4>
            <p style={{ fontSize: "0.9rem", color: "#666" }}>
              Detailed analysis of your trading history with profit/loss breakdowns and tax reports.
            </p>
          </div>

          <div style={{ padding: "20px", background: "#f5f5f5", borderRadius: "8px" }}>
            <h4 style={{ fontSize: "1rem", marginBottom: "10px", color: "#333" }}>
              Investment Analytics
            </h4>
            <p style={{ fontSize: "0.9rem", color: "#666" }}>
              Track your portfolio performance with visual charts and sector-wise allocation.
            </p>
          </div>

          <div style={{ padding: "20px", background: "#f5f5f5", borderRadius: "8px" }}>
            <h4 style={{ fontSize: "1rem", marginBottom: "10px", color: "#333" }}>
              Tax Statements
            </h4>
            <p style={{ fontSize: "0.9rem", color: "#666" }}>
              Generate tax reports and statements for ITR filing and compliance.
            </p>
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
          Quick Actions
        </h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            style={{
              padding: "10px 20px",
              background: "#4184f3",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "0.9rem",
            }}
            onClick={() => window.location.href = "/"}
          >
            View Dashboard
          </button>
          <button
            style={{
              padding: "10px 20px",
              background: "#4184f3",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "0.9rem",
            }}
            onClick={() => window.location.href = "/holdings"}
          >
            View Holdings
          </button>
          <button
            style={{
              padding: "10px 20px",
              background: "#4184f3",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "0.9rem",
            }}
            onClick={() => window.location.href = "/orders"}
          >
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default Console;
