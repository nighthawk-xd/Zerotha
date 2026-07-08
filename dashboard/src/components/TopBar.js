import React from "react";

import Menu from "./Menu";

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = process.env.REACT_APP_FRONTEND_URL ? `${process.env.REACT_APP_FRONTEND_URL}/login` : "/login";
};

const TopBar = () => {
  return (
    <div className="topbar-container">
      <div className="indices-container">
        <div className="nifty">
          <p className="index">NIFTY 50</p>
          <p className="index-points">{100.2} </p>
          <p className="percent"> </p>
        </div>
        <div className="sensex">
          <p className="index">SENSEX</p>
          <p className="index-points">{100.2}</p>
          <p className="percent"></p>
        </div>
      </div>

      <Menu />

      <button
        onClick={handleLogout}
        style={{
          marginRight: "20px",
          padding: "6px 16px",
          border: "1px solid #e0e0e0",
          borderRadius: "4px",
          background: "#fff",
          color: "#e53935",
          fontSize: "0.8rem",
          fontWeight: "500",
          cursor: "pointer",
          whiteSpace: "nowrap",
          transition: "background 0.2s, color 0.2s",
        }}
        onMouseOver={(e) => {
          e.target.style.background = "#e53935";
          e.target.style.color = "#fff";
        }}
        onMouseOut={(e) => {
          e.target.style.background = "#fff";
          e.target.style.color = "#e53935";
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default TopBar;
