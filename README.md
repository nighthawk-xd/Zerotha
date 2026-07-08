# Zerodha Project

This repository contains a full-stack web application inspired by a trading and investing platform. It is structured as a modern Monorepo containing three core modules:

- **Backend:** Node.js API server, MongoDB persistence layer, and static file server for production.
- **Dashboard:** React-based trading dashboard UI with live prices, holdings, orders, positions, funds, and charts.
- **Frontend:** React-based public-facing landing and marketing pages with authentication flows.

The project is designed to be highly realistic, secure, and production-ready.

---

## 1. Project Overview

This application simulates a full broker experience:

1. **Backend Service:** Stores portfolio data, authenticates users with JWT, and rigorously validates all inputs.
2. **Dashboard:** A dynamic trading dashboard where users can view live-updating prices, check their holdings/positions, place trades, and manage funds.
3. **Frontend Landing:** A polished marketing experience that funnels users into secure Sign Up and Login flows with real-time field validation.

---

## 2. Core Features

### Security & Authentication
- **JWT-Based Auth:** Secure JSON Web Tokens used for protecting API routes.
- **Comprehensive Validation:** 
  - **Server-side:** Strict `Joi` schema validation across all endpoints.
  - **Database:** Hardened Mongoose schemas (`min`, `max`, `match`, `enum` constraints).
  - **Client-side:** Real-time per-field form validation with Password Strength metering.

### Live Trading Dashboard
- **Live Price Engine:** A custom hook simulates real-time market fluctuations every second (random walks, volatility, spikes) which instantly reflect in the watchlist and portfolio.
- **Animations:** CSS animations (green/red flashes) on price ticks for a realistic trading terminal feel.
- **Trading Simulator:** Buy and Sell actions validate against real-time prices, available cash balances, and currently held quantities.

### Fund Management
- Add and withdraw funds securely.
- Enforced constraints: min/max limits, UPI format validation, and OTP requirements for withdrawals.

---

## 3. Tech Stack

- **Backend:** Node.js, Express.js, MongoDB, Mongoose, Joi, JWT, bcryptjs, CORS
- **Dashboard & Frontend:** React.js, React Router, Axios, Material UI, Chart.js

---

## 4. Environment Setup

Create `.env` files in the following locations:

### `backend/.env`
```env
PORT=3002
MONGODB_URI=mongodb://your-mongo-uri
JWT_SECRET=your_super_secret_64_character_hex_string
```

### `frontend/.env` & `dashboard/.env`
```env
REACT_APP_API_URL=http://localhost:3002
```

*(Note: In production, `REACT_APP_API_URL` can be left empty if served by the same backend).*

---

## 5. Installation and Running (Development)

This project uses a unified root `package.json` to manage the monorepo easily.

### 1. Install all dependencies
Run this from the project root. It will install packages for the backend, frontend, and dashboard.
```bash
npm run install:all
```

### 2. Start all development servers
Run this from the project root to spin up the backend (3002), frontend (3000), and dashboard (3001) concurrently.
```bash
npm run dev
```

---

## 6. Production Deployment

The application is configured for a **Unified Serving Architecture**. When built for production, the Node.js backend serves its API routes alongside the static files of both React applications. 

### 1. Build the React apps
From the root directory:
```bash
npm run build:all
```
This compiles the frontend and dashboard into optimized static `build` folders.

### 2. Start the Production Server
```bash
NODE_ENV=production npm start
```
The Node.js server will start on port `3002` (or your `$PORT`). 
- Navigating to `/` serves the **Frontend**.
- Navigating to `/dashboard` serves the **Dashboard**.
- All `/api/*` or specific endpoints serve the **Backend API**.

---

## 7. Data Models

- **UserModel:** Secure authentication data and hashed passwords.
- **Balance:** Available account cash.
- **Holdings:** Current stock/asset quantities owned by the user.
- **Orders:** Trades that have been placed.
- **Positions:** Portfolio positions used in the dashboard view.
- **Fund Transactions:** History of deposits and withdrawals.

## 8. Development Notes

- The backend serves as the single source of truth for portfolio, balance, and authentication states.
- The `useLivePrices` hook in the dashboard simulates a live websocket data feed. If integrating a real API (like Kite Connect or Alpaca), swap this hook out with real websocket listeners.
- **Always keep your JWT secret safe.** Changing the secret in the `.env` file will invalidate all currently active user sessions.
