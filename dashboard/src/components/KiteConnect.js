import React, { useState } from "react";

const KiteConnect = () => {
  const [apiKey, setApiKey] = useState("");
  const [apiSecret, setApiSecret] = useState("");
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    if (apiKey && apiSecret) {
      setGenerated(true);
      setTimeout(() => setGenerated(false), 3000);
    }
  };

  const features = [
    { icon: "📊", title: "Real-time Data", description: "Access live market data with WebSocket streaming" },
    { icon: "🔒", title: "Secure Authentication", description: "OAuth 2.0 based secure API authentication" },
    { icon: "⚡", title: "High Performance", description: "Low latency API with 99.9% uptime SLA" },
    { icon: "📱", title: "Multi-platform", description: "Build for web, mobile, and desktop applications" },
    { icon: "🔧", title: "Comprehensive Docs", description: "Detailed documentation with code examples" },
    { icon: "🧪", title: "Sandbox Environment", description: "Test your applications in a safe environment" },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "20px", color: "#333" }}>
        Kite Connect API
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
          Build Powerful Trading Platforms
        </h3>
        <p style={{ color: "#666", lineHeight: "1.6", marginBottom: "20px" }}>
          Build powerful trading platforms and experiences with our super simple HTTP/JSON APIs. If you are a startup, build your investment app and showcase it to our clientbase.
        </p>

        <div style={{ display: "flex", gap: "15px", marginBottom: "20px" }}>
          <div style={{ padding: "15px", background: "#e8f5e9", borderRadius: "8px", flex: "1" }}>
            <h4 style={{ fontSize: "1.5rem", marginBottom: "5px", color: "#2e7d32" }}>REST</h4>
            <p style={{ fontSize: "0.85rem", color: "#666" }}>API</p>
          </div>
          <div style={{ padding: "15px", background: "#e3f2fd", borderRadius: "8px", flex: "1" }}>
            <h4 style={{ fontSize: "1.5rem", marginBottom: "5px", color: "#1565c0" }}>WebSocket</h4>
            <p style={{ fontSize: "0.85rem", color: "#666" }}>Streaming</p>
          </div>
          <div style={{ padding: "15px", background: "#fff3e0", borderRadius: "8px", flex: "1" }}>
            <h4 style={{ fontSize: "1.5rem", marginBottom: "5px", color: "#e65100" }}>JSON</h4>
            <p style={{ fontSize: "0.85rem", color: "#666" }}>Format</p>
          </div>
        </div>
      </div>

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
          API Features
        </h3>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
          {features.map((feature, index) => (
            <div key={index} style={{ padding: "20px", background: "#f5f5f5", borderRadius: "8px" }}>
              <div style={{ fontSize: "2rem", marginBottom: "10px" }}>{feature.icon}</div>
              <h4 style={{ fontSize: "1rem", marginBottom: "8px", color: "#333" }}>{feature.title}</h4>
              <p style={{ fontSize: "0.85rem", color: "#666", lineHeight: "1.4" }}>{feature.description}</p>
            </div>
          ))}
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
          Generate API Credentials
        </h3>
        
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontSize: "0.9rem", color: "#666" }}>
            API Key
          </label>
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your API key"
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #d7d7d7",
              borderRadius: "6px",
              fontSize: "1rem",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontSize: "0.9rem", color: "#666" }}>
            API Secret
          </label>
          <input
            type="password"
            value={apiSecret}
            onChange={(e) => setApiSecret(e.target.value)}
            placeholder="Enter your API secret"
            style={{
              width: "100%",
              padding: "12px",
              border: "1px solid #d7d7d7",
              borderRadius: "6px",
              fontSize: "1rem",
            }}
          />
        </div>

        <button
          onClick={handleGenerate}
          style={{
            padding: "12px 24px",
            background: "#4184f3",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "1rem",
          }}
        >
          Generate Credentials
        </button>

        {generated && (
          <div style={{ marginTop: "20px", padding: "15px", background: "#d4edda", borderRadius: "6px" }}>
            <p style={{ fontSize: "0.9rem", color: "#155724", margin: 0 }}>
              API credentials generated successfully! Check your email for confirmation.
            </p>
          </div>
        )}

        <div style={{ marginTop: "20px", padding: "15px", background: "#fff3e0", borderRadius: "8px", border: "1px solid #ffe0b2" }}>
          <p style={{ fontSize: "0.85rem", color: "#e65100", margin: 0 }}>
            <strong>Note:</strong> This is a demo interface. Actual API credentials require verification and compliance checks.
          </p>
        </div>
      </div>
    </div>
  );
};

export default KiteConnect;
