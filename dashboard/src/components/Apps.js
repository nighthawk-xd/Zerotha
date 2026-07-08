import React from "react";
import { useNavigate } from "react-router-dom";

const apps = [
  { name: "Console", icon: "🧾", link: "/console", description: "Central dashboard for your Zerodha account" },
  { name: "Coin", icon: "🪙", link: "/coin", description: "Commission-free mutual funds" },
  { name: "Kite", icon: "⚡", link: "/", description: "Ultra-fast trading platform" },
  { name: "Varsity", icon: "📘", link: "/varsity", description: "Stock market lessons" },
  { name: "Kite Connect", icon: "🔌", link: "/kite-connect", description: "Build trading platforms with APIs" },
  { name: "Support", icon: "💬", link: "/support", description: "Help and support center" },
];

const Apps = () => {
  const navigate = useNavigate();

  const handleAppClick = (app) => {
    navigate(app.link);
  };

  return (
    <div className="apps-page">
      <h3 className="title">Apps</h3>
      <p className="apps-subtitle">Quick access to the tools you use most.</p>

      <div className="apps-grid">
        {apps.map((app) => (
          <div
            key={app.name}
            onClick={() => handleAppClick(app)}
            className="app-card"
            style={{ cursor: "pointer" }}
          >
            <div className="app-icon">{app.icon}</div>
            <h4>{app.name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Apps;