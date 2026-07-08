import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

const Menu = () => {
  const navigate = useNavigate();
  const [selectedMenu, setSelectedMenu] = useState(0);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleMenuClick = (index) => {
    setSelectedMenu(index);
  };

  const handleProfileClick = (e) => {
    e.stopPropagation();
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = process.env.REACT_APP_FRONTEND_URL ? `${process.env.REACT_APP_FRONTEND_URL}/login` : "/login";
  };

  const handleProfile = () => {
    navigate("/profile");
    setIsProfileDropdownOpen(false);
  };

  const handleHelp = () => {
    navigate("/support");
    setIsProfileDropdownOpen(false);
  };

  const handleDeleteAccount = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone and will permanently delete all your data including holdings, positions, orders, and funds."
    );

    if (!confirmed) return;

    setIsDeleting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.REACT_APP_API_URL || ''}/account`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("Delete response:", response.status, data);

      if (response.ok) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = process.env.REACT_APP_FRONTEND_URL || "/";
      } else {
        alert(`Failed to delete account: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert(`Failed to delete account: ${error.message}`);
    } finally {
      setIsDeleting(false);
      setIsProfileDropdownOpen(false);
    }
  };

  const handleDropdownClick = (e) => {
    e.stopPropagation();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isProfileDropdownOpen) {
        setIsProfileDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isProfileDropdownOpen]);

  const menuClass = "menu";
  const activeMenuClass = "menu selected";

  // Get user info from localStorage
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const userInitials = user.name ? user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) : "ZU";
  const userName = user.name || "USERID";

  return (
    <div className="menu-container">
      <img src="logo.png" style={{ width: "50px" }} />
      <div className="menus">
        <ul>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/"
              onClick={() => handleMenuClick(0)}
            >
              <p className={selectedMenu === 0 ? activeMenuClass : menuClass}>
                Dashboard
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/orders"
              onClick={() => handleMenuClick(1)}
            >
              <p className={selectedMenu === 1 ? activeMenuClass : menuClass}>
                Orders
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/holdings"
              onClick={() => handleMenuClick(2)}
            >
              <p className={selectedMenu === 2 ? activeMenuClass : menuClass}>
                Holdings
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/positions"
              onClick={() => handleMenuClick(3)}
            >
              <p className={selectedMenu === 3 ? activeMenuClass : menuClass}>
                Positions
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="funds"
              onClick={() => handleMenuClick(4)}
            >
              <p className={selectedMenu === 4 ? activeMenuClass : menuClass}>
                Funds
              </p>
            </Link>
          </li>
          <li>
            <Link
              style={{ textDecoration: "none" }}
              to="/apps"
              onClick={() => handleMenuClick(6)}
            >
              <p className={selectedMenu === 6 ? activeMenuClass : menuClass}>
                Apps
              </p>
            </Link>
          </li>
        </ul>
        <hr />
        <div className="profile" onClick={handleProfileClick}>
          <div className="avatar">{userInitials}</div>
          <p className="username">{userName}</p>
          {isProfileDropdownOpen && (
            <div className="profile-dropdown" onClick={handleDropdownClick}>
              <div className="dropdown-item" onClick={handleProfile}>
                Profile
              </div>
              <div className="dropdown-item" onClick={handleHelp}>
                Help & Support
              </div>
              <div className="dropdown-item" onClick={handleLogout}>
                Logout
              </div>
              <div
                className="dropdown-item delete-account"
                onClick={handleDeleteAccount}
                style={{ color: "#e53935" }}
              >
                {isDeleting ? "Deleting..." : "Delete Account"}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Menu;