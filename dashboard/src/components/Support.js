import React, { useState } from "react";

const Support = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would send to a support backend
    console.log("Support request:", { ...formData, userEmail: user.email });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ subject: "", message: "" });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "20px", color: "#333" }}>
        Help & Support
      </h2>

      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
        {/* User Info Card */}
        <div
          style={{
            flex: "1",
            minWidth: "300px",
            background: "#fff",
            border: "1px solid #e6e6e6",
            borderRadius: "12px",
            padding: "30px",
          }}
        >
          <h3
            style={{
              fontSize: "1.2rem",
              marginBottom: "20px",
              color: "#333",
            }}
          >
            Your Account Info
          </h3>
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontSize: "0.85rem",
                color: "#666",
              }}
            >
              Name
            </label>
            <div style={{ fontSize: "1rem", color: "#333" }}>
              {user.name || "Not available"}
            </div>
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontSize: "0.85rem",
                color: "#666",
              }}
            >
              Email
            </label>
            <div style={{ fontSize: "0.9rem", color: "#333" }}>
              {user.email || "Not available"}
            </div>
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "5px",
                fontSize: "0.85rem",
                color: "#666",
              }}
            >
              User ID
            </label>
            <div
              style={{
                fontSize: "0.85rem",
                color: "#666",
                fontFamily: "monospace",
                wordBreak: "break-all",
              }}
            >
              {user._id || "Not available"}
            </div>
          </div>
        </div>

        {/* Support Form */}
        <div
          style={{
            flex: "2",
            minWidth: "300px",
            background: "#fff",
            border: "1px solid #e6e6e6",
            borderRadius: "12px",
            padding: "30px",
          }}
        >
          <h3
            style={{
              fontSize: "1.2rem",
              marginBottom: "20px",
              color: "#333",
            }}
          >
            Contact Support
          </h3>

          {submitted && (
            <div
              style={{
                padding: "15px",
                marginBottom: "20px",
                background: "#d4edda",
                color: "#155724",
                borderRadius: "6px",
                fontSize: "0.9rem",
              }}
            >
              Your support request has been submitted. We'll get back to you soon!
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: "20px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "0.9rem",
                  color: "#666",
                }}
              >
                Subject
              </label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) =>
                  setFormData({ ...formData, subject: e.target.value })
                }
                required
                placeholder="Brief description of your issue"
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
              <label
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontSize: "0.9rem",
                  color: "#666",
                }}
              >
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                required
                placeholder="Describe your issue in detail"
                rows="6"
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #d7d7d7",
                  borderRadius: "6px",
                  fontSize: "1rem",
                  resize: "vertical",
                }}
              />
            </div>

            <button
              type="submit"
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
              Submit Request
            </button>
          </form>

          <div style={{ marginTop: "30px", paddingTop: "20px", borderTop: "1px solid #e6e6e6" }}>
            <h4 style={{ fontSize: "1rem", marginBottom: "15px", color: "#333" }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li style={{ marginBottom: "10px" }}>
                <a
                  href="#"
                  style={{
                    color: "#4184f3",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                  }}
                >
                  How to place orders
                </a>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <a
                  href="#"
                  style={{
                    color: "#4184f3",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                  }}
                >
                  Understanding holdings vs positions
                </a>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <a
                  href="#"
                  style={{
                    color: "#4184f3",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                  }}
                >
                  Adding funds to your account
                </a>
              </li>
              <li style={{ marginBottom: "10px" }}>
                <a
                  href="#"
                  style={{
                    color: "#4184f3",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                  }}
                >
                  Account security tips
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Support;
