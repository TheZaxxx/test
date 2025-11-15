import React from "react";
import LiveTrades from "../components/LiveTrades";

export default function LivePage() {
  return (
    <main style={{ padding: 20 }}>
      <h1>Market Live</h1>
      <LiveTrades />
    </main>
  );
}