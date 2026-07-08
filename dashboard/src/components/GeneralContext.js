import React, { useEffect, useMemo, useState, useCallback } from "react";
import axios from "axios";

import BuyActionWindow from "./BuyActionWindow";
import useLivePrices from "./useLivePrices";
import { watchlist, holdings as initialHoldings } from "../data/data";

const getAuthHeaders = () => ({
  headers: { Authorization: "Bearer " + localStorage.getItem("token") },
});

const GeneralContext = React.createContext({
  openTradeWindow: () => {},
  closeTradeWindow: () => {},
  placeTrade: () => {},
  cashBalance: 0,
  portfolio: [],
  orders: [],
  tradeWindowData: {},
  isTradeWindowOpen: false,
  livePrices: {},
  liveWatchlist: [],
});

export const GeneralContextProvider = (props) => {
  const [isTradeWindowOpen, setIsTradeWindowOpen] = useState(false);
  const [tradeWindowData, setTradeWindowData] = useState({
    symbol: "",
    price: 0,
    mode: "BUY",
  });
  const [cashBalance, setCashBalance] = useState(50000);
  const [rawPortfolio, setRawPortfolio] = useState(initialHoldings);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL || ''}/balance`, getAuthHeaders());
        setCashBalance(Number(response.data?.amount ?? 50000));
      } catch (error) {
        console.error('Error fetching balance:', error);
        setCashBalance(50000);
      }
    };

    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL || ''}/orders`, getAuthHeaders());
        setOrders(response.data || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setOrders([]);
      }
    };

    const fetchHoldings = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL || ''}/holdings`, getAuthHeaders());
        setRawPortfolio(response.data || []);
      } catch (error) {
        console.error('Error fetching holdings:', error);
        setRawPortfolio([]);
      }
    };

    fetchBalance();
    fetchOrders();
    fetchHoldings();
  }, []);

  // Build a unified base-price map from holdings + watchlist
  const basePrices = useMemo(() => {
    const map = {};
    rawPortfolio.forEach((h) => { if (h.name && h.price) map[h.name] = Number(h.price); });
    watchlist.forEach((w) => { if (w.name && w.price && !map[w.name]) map[w.name] = Number(w.price); });
    return map;
  }, [rawPortfolio]);

  // Run the live price simulation engine (ticks every 1s)
  const { livePrices, getPrice } = useLivePrices(basePrices, 1000);

  // Portfolio with live prices injected
  const portfolio = useMemo(() => {
    return rawPortfolio.map((stock) => ({
      ...stock,
      price: getPrice(stock.name) || Number(stock.price),
    }));
  }, [rawPortfolio, livePrices]); // eslint-disable-line react-hooks/exhaustive-deps

  // Live watchlist derived from static watchlist + live prices
  const liveWatchlist = useMemo(() => {
    return watchlist.map((stock) => {
      const live = livePrices[stock.name];
      if (!live) return stock;
      return {
        ...stock,
        price: live.price,
        percent: live.changePercent,
        isDown: !live.isUp,
        prevPrice: live.prevPrice,
        change: live.change,
      };
    });
  }, [livePrices]);

  const handleOpenTradeWindow = useCallback(({ symbol, price, mode }) => {
    setTradeWindowData({ symbol, price: getPrice(symbol) || price, mode });
    setIsTradeWindowOpen(true);
  }, [getPrice]);

  const handleCloseTradeWindow = useCallback(() => {
    setIsTradeWindowOpen(false);
    setTradeWindowData({ symbol: "", price: 0, mode: "BUY" });
  }, []);

  const handlePlaceTrade = useCallback(({ symbol, qty, price, side }) => {
    const quantity = Number(qty);
    const tradePrice = getPrice(symbol) || Number(price);

    if (!Number.isFinite(quantity) || quantity <= 0) {
      throw new Error("Quantity must be greater than zero");
    }

    if (!Number.isFinite(tradePrice) || tradePrice <= 0) {
      throw new Error("Price must be greater than zero");
    }

    const tradeValue = quantity * tradePrice;

    if (side === "BUY") {
      if (cashBalance < tradeValue) {
        throw new Error("Insufficient funds");
      }

      const existing = rawPortfolio.find((item) => item.name === symbol);
      const updatedPortfolio = existing
        ? rawPortfolio.map((item) =>
            item.name === symbol
              ? {
                  ...item,
                  qty: item.qty + quantity,
                  avg: (item.avg * item.qty + tradePrice * quantity) / (item.qty + quantity),
                  price: tradePrice,
                }
              : item
          )
        : [...rawPortfolio, { name: symbol, qty: quantity, avg: tradePrice, price: tradePrice, net: "0.00%" }];

      setRawPortfolio(updatedPortfolio);
      axios.post(`${process.env.REACT_APP_API_URL || ''}/holdings`, { holdings: updatedPortfolio }, getAuthHeaders()).catch(() => {});
      const nextBalance = cashBalance - tradeValue;
      setCashBalance(nextBalance);
      axios.post(`${process.env.REACT_APP_API_URL || ''}/balance`, { amount: nextBalance }, getAuthHeaders()).catch(() => {});

      const orderPayload = {
        symbol,
        qty: quantity,
        price: tradePrice,
        side,
        time: new Date().toLocaleString(),
      };

      axios.post(`${process.env.REACT_APP_API_URL || ''}/orders`, orderPayload, getAuthHeaders()).catch(() => {});
      setOrders((prevOrders) => [orderPayload, ...prevOrders]);
      setIsTradeWindowOpen(false);
      return { success: true };
    }

    if (side === "SELL") {
      const existing = rawPortfolio.find((item) => item.name === symbol);
      if (!existing || existing.qty < quantity) {
        throw new Error("Not enough shares");
      }

      const updatedPortfolio = rawPortfolio
        .map((item) => {
          if (item.name !== symbol) return item;
          const remainingQty = item.qty - quantity;
          return remainingQty > 0 ? { ...item, qty: remainingQty } : null;
        })
        .filter(Boolean);

      const nextBalance = cashBalance + tradeValue;
      setCashBalance(nextBalance);
      axios.post(`${process.env.REACT_APP_API_URL || ''}/balance`, { amount: nextBalance }, getAuthHeaders()).catch(() => {});

      setRawPortfolio(updatedPortfolio);
      axios.post(`${process.env.REACT_APP_API_URL || ''}/holdings`, { holdings: updatedPortfolio }, getAuthHeaders()).catch(() => {});

      const orderPayload = {
        symbol,
        qty: quantity,
        price: tradePrice,
        side,
        time: new Date().toLocaleString(),
      };

      axios.post(`${process.env.REACT_APP_API_URL || ''}/orders`, orderPayload, getAuthHeaders()).catch(() => {});
      setOrders((prevOrders) => [orderPayload, ...prevOrders]);
      setIsTradeWindowOpen(false);
      return { success: true };
    }

    throw new Error("Invalid trade side");
  }, [cashBalance, rawPortfolio, getPrice]);

  const contextValue = useMemo(
    () => ({
      openTradeWindow: handleOpenTradeWindow,
      closeTradeWindow: handleCloseTradeWindow,
      placeTrade: handlePlaceTrade,
      cashBalance,
      portfolio,
      orders,
      tradeWindowData,
      isTradeWindowOpen,
      livePrices,
      liveWatchlist,
      getPrice,
    }),
    [cashBalance, isTradeWindowOpen, orders, portfolio, tradeWindowData, livePrices, liveWatchlist, getPrice, handleOpenTradeWindow, handleCloseTradeWindow, handlePlaceTrade]
  );

  return (
    <GeneralContext.Provider value={contextValue}>
      {props.children}
      {isTradeWindowOpen && <BuyActionWindow {...tradeWindowData} />}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
