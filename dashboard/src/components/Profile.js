import React, { useState } from "react";

const NAME_REGEX = /^[a-zA-Z\s'.\-]+$/;

const validateName = (val) => {
  if (!val.trim()) return "Name is required.";
  if (val.trim().length < 2) return "Name must be at least 2 characters.";
  if (val.trim().length > 50) return "Name must be at most 50 characters.";
  if (!NAME_REGEX.test(val.trim())) return "Name can only contain letters, spaces, hyphens, and apostrophes.";
  return "";
};

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user.name || "");
  const [message, setMessage] = useState("");
  const [nameError, setNameError] = useState("");

  const handleNameChange = (e) => {
    setEditedName(e.target.value);
    setNameError(validateName(e.target.value));
  };

  const handleUpdateProfile = async () => {
    const err = validateName(editedName);
    setNameError(err);
    if (err) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.REACT_APP_API_URL || ''}/me`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ name: editedName.trim() }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("user", JSON.stringify(data));
        setMessage("Profile updated successfully!");
        setIsEditing(false);
        setNameError("");
        setTimeout(() => setMessage(""), 3000);
      } else {
        const errData = await response.json().catch(() => ({}));
        if (errData.errors?.name) setNameError(errData.errors.name);
        setMessage(errData.message || "Failed to update profile");
      }
    } catch (error) {
      setMessage("Failed to update profile");
    }
  };

  const isSaveDisabled = !!nameError || !editedName.trim();

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ fontSize: "1.5rem", marginBottom: "20px", color: "#333" }}>
        Profile Settings
      </h2>

      <div
        style={{
          background: "#fff",
          border: "1px solid #e6e6e6",
          borderRadius: "12px",
          padding: "30px",
          maxWidth: "600px",
        }}
      >
        <div style={{ marginBottom: "20px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontSize: "0.9rem",
              color: "#666",
            }}
          >
            Name
          </label>
          {isEditing ? (
            <>
              <input
                type="text"
                value={editedName}
                onChange={handleNameChange}
                onBlur={() => setNameError(validateName(editedName))}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: `1px solid ${nameError ? '#e53935' : '#d7d7d7'}`,
                  borderRadius: "6px",
                  fontSize: "1rem",
                  boxShadow: nameError ? '0 0 0 2px rgba(229,57,53,0.15)' : 'none',
                }}
              />
              {nameError && (
                <p style={{ color: '#e53935', fontSize: '0.8rem', margin: '4px 0 0' }}>{nameError}</p>
              )}
            </>
          ) : (
            <div
              style={{
                padding: "10px",
                background: "#f5f5f5",
                borderRadius: "6px",
                fontSize: "1rem",
                color: "#333",
              }}
            >
              {user.name || "Not set"}
            </div>
          )}
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
            Email
          </label>
          <div
            style={{
              padding: "10px",
              background: "#f5f5f5",
              borderRadius: "6px",
              fontSize: "1rem",
              color: "#333",
            }}
          >
            {user.email || "Not set"}
          </div>
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
            User ID
          </label>
          <div
            style={{
              padding: "10px",
              background: "#f5f5f5",
              borderRadius: "6px",
              fontSize: "0.9rem",
              color: "#666",
              fontFamily: "monospace",
            }}
          >
            {user._id || "Not available"}
          </div>
        </div>

        {message && (
          <div
            style={{
              padding: "10px",
              marginBottom: "20px",
              background: message.includes("success")
                ? "#d4edda"
                : "#f8d7da",
              color: message.includes("success") ? "#155724" : "#721c24",
              borderRadius: "6px",
              fontSize: "0.9rem",
            }}
          >
            {message}
          </div>
        )}

        <div style={{ display: "flex", gap: "10px" }}>
          {isEditing ? (
            <>
              <button
                onClick={handleUpdateProfile}
                disabled={isSaveDisabled}
                style={{
                  padding: "10px 20px",
                  background: isSaveDisabled ? "#a0c4f1" : "#4184f3",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: isSaveDisabled ? "not-allowed" : "pointer",
                  fontSize: "0.9rem",
                }}
              >
                Save Changes
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditedName(user.name || "");
                  setNameError("");
                }}
                style={{
                  padding: "10px 20px",
                  background: "#f0f0f0",
                  color: "#333",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              style={{
                padding: "10px 20px",
                background: "#4184f3",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                fontSize: "0.9rem",
              }}
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
