import { useState, useEffect, useRef, useCallback } from "react";

// Hook to simulate live price ticks based on initial static data
const useLivePrices = (basePrices, intervalMs = 1000) => {
  const [livePrices, setLivePrices] = useState(() => {
    const initial = {};
    for (const [symbol, price] of Object.entries(basePrices)) {
      initial[symbol] = {
        price: Number(price),
        prevPrice: Number(price),
        change: 0,
        changePercent: "0.00%",
        isUp: true,
      };
    }
    return initial;
  });

  // Track the "session open" price for day % calculation
  const openPricesRef = useRef({});

  useEffect(() => {
    // Set open prices once on mount (or when basePrices change)
    const opens = {};
    for (const [symbol, price] of Object.entries(basePrices)) {
      opens[symbol] = Number(price);
    }
    openPricesRef.current = opens;

    // Also reset livePrices when basePrices fundamentally change (new symbols added)
    setLivePrices((prev) => {
      const next = { ...prev };
      for (const [symbol, price] of Object.entries(basePrices)) {
        if (!next[symbol]) {
          next[symbol] = {
            price: Number(price),
            prevPrice: Number(price),
            change: 0,
            changePercent: "0.00%",
            isUp: true,
          };
          opens[symbol] = Number(price);
        }
      }
      // Remove symbols that no longer exist
      for (const symbol of Object.keys(next)) {
        if (!(symbol in basePrices)) {
          delete next[symbol];
        }
      }
      return next;
    });
  }, [basePrices]);

  useEffect(() => {
    if (Object.keys(basePrices).length === 0) return;

    const tick = () => {
      setLivePrices((prev) => {
        const next = {};
        for (const [symbol, data] of Object.entries(prev)) {
          const currentPrice = data.price;

          // Random walk: ±0.05% to ±0.4% per tick, with slight upward bias
          const volatility = 0.0005 + Math.random() * 0.0035; // 0.05% – 0.4%
          const direction = Math.random() > 0.48 ? 1 : -1;   // slight upward bias
          const delta = currentPrice * volatility * direction;

          // Add occasional larger moves (simulate news/events)
          const spike = Math.random() > 0.97 ? (Math.random() * 0.008 * currentPrice * (Math.random() > 0.5 ? 1 : -1)) : 0;

          let newPrice = currentPrice + delta + spike;

          // Prevent going below 1% of open price or above 200% of open
          const openPrice = openPricesRef.current[symbol] || currentPrice;
          newPrice = Math.max(openPrice * 0.9, Math.min(openPrice * 1.1, newPrice));

          // Round to 2 decimals
          newPrice = Math.round(newPrice * 100) / 100;

          const dayChange = newPrice - openPrice;
          const dayChangePercent = openPrice > 0 ? ((dayChange / openPrice) * 100) : 0;

          next[symbol] = {
            price: newPrice,
            prevPrice: currentPrice,
            change: Math.round(dayChange * 100) / 100,
            changePercent: `${dayChangePercent >= 0 ? "+" : ""}${dayChangePercent.toFixed(2)}%`,
            isUp: newPrice >= currentPrice,
          };
        }
        return next;
      });
    };

    const id = setInterval(tick, intervalMs);
    return () => clearInterval(id);
  }, [basePrices, intervalMs]);

  // Helper: get the live price for a symbol, falling back to base
  const getPrice = useCallback(
    (symbol) => livePrices[symbol]?.price ?? basePrices[symbol] ?? 0,
    [livePrices, basePrices]
  );

  return { livePrices, getPrice };
};

export default useLivePrices;
