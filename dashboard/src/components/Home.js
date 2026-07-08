import React from "react";
import { Routes, Route } from "react-router-dom";

import Dashboard from "./Dashboard";
import TopBar from "./TopBar";
import Profile from "./Profile";
import Support from "./Support";
import Apps from "./Apps";
import Funds from "./Funds";
import Holdings from "./Holdings";
import Orders from "./Orders";
import Positions from "./Positions";
import Summary from "./Summary";
import WatchList from "./WatchList";
import Console from "./Console";
import Coin from "./Coin";
import Varsity from "./Varsity";
import KiteConnect from "./KiteConnect";
import { GeneralContextProvider } from "./GeneralContext";

const Home = () => {
  return (
    <>
      <TopBar />
      <div className="dashboard-container">
        <GeneralContextProvider>
          <WatchList />
          <div className="content">
            <Routes>
              <Route path="/" element={<Summary />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/holdings" element={<Holdings />} />
              <Route path="/positions" element={<Positions />} />
              <Route path="/funds" element={<Funds />} />
              <Route path="/apps" element={<Apps />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/support" element={<Support />} />
              <Route path="/console" element={<Console />} />
              <Route path="/coin" element={<Coin />} />
              <Route path="/varsity" element={<Varsity />} />
              <Route path="/kite-connect" element={<KiteConnect />} />
            </Routes>
          </div>
        </GeneralContextProvider>
      </div>
    </>
  );
};

export default Home;
