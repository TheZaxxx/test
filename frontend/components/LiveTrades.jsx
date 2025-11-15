import React, { useEffect, useRef, useState } from "react";
import createSocket from "../utils/socketClient";

export default function LiveTrades() {
  const [trades, setTrades] = useState([]);
  const [ticker, setTicker] = useState(null);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = createSocket((msg) => {
      if (msg.type === "trade") {
        setTrades((s) => [msg.data, ...s].slice(0, 50));
      } else if (msg.type === "ticker") {
        setTicker(msg.data);
      } else if (msg.type === "meta") {
        // optional: show client count
        // console.log("meta", msg);
      }
    });

    return () => {
      socketRef.current && socketRef.current.close();
    };
  }, []);

  return (
    <div style={{ padding: 16, fontFamily: "system-ui, sans-serif" }}>
      <h3>Live Trades</h3>
      {ticker && (
        <div style={{ marginBottom: 8 }}>
          <strong>{ticker.pair}</strong> price: {ticker.price} <small>({new Date(ticker.ts).toLocaleTimeString()})</small>
        </div>
      )}
      <div style={{ maxHeight: 360, overflow: "auto", border: "1px solid #eee", padding: 8 }}>
        {trades.length === 0 && <div style={{ color: "#888" }}>No trades yet</div>}
        {trades.map((t, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px dashed #f0f0f0" }}>
            <div>
              <strong>{t.price}</strong> × {t.amount}
            </div>
            <div style={{ color: "#666", fontSize: 12 }}>{t.buyOrderId} ↔ {t.sellOrderId}</div>
          </div>
        ))}
      </div>
    </div>
  );
}