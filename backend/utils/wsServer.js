import WebSocket, { WebSocketServer } from "ws";
import matchEvents from "../matching-engine/matchEventEmitter.js";

/*
  Simple WebSocket server helper.
  - Exports initWebSocket(httpServer) : attach WS to existing http.Server
  - Broadcasts trade events received from matching engine (matchEvents 'trade')
  - Sends periodic heartbeat & simulated ticker update
  - Accepts client messages: { type: "subscribe", channel: "trades" } (basic)
*/

const clients = new Map(); // ws -> { subscriptions: Set }

function broadcast(obj, filterFn) {
  const str = JSON.stringify(obj);
  for (const [ws, meta] of clients.entries()) {
    if (ws.readyState === WebSocket.OPEN) {
      if (!filterFn || filterFn(meta)) ws.send(str);
    }
  }
}

export function initWebSocket(server) {
  const wss = new WebSocketServer({ server, path: "/ws" });

  wss.on("connection", (ws, req) => {
    // store client meta
    clients.set(ws, { subscriptions: new Set(), connectedAt: Date.now() });

    // welcome
    ws.send(JSON.stringify({ type: "hello", message: "ws connected", ts: Date.now() }));

    ws.on("message", (data) => {
      let msg;
      try {
        msg = JSON.parse(data.toString());
      } catch (e) {
        return ws.send(JSON.stringify({ type: "error", error: "invalid_json" }));
      }

      // handle basic commands
      if (msg.type === "subscribe" && msg.channel) {
        clients.get(ws).subscriptions.add(msg.channel);
        ws.send(JSON.stringify({ type: "subscribed", channel: msg.channel }));
        return;
      }
      if (msg.type === "unsubscribe" && msg.channel) {
        clients.get(ws).subscriptions.delete(msg.channel);
        ws.send(JSON.stringify({ type: "unsubscribed", channel: msg.channel }));
        return;
      }
      if (msg.type === "ping") {
        ws.send(JSON.stringify({ type: "pong", ts: Date.now() }));
        return;
      }
      ws.send(JSON.stringify({ type: "error", error: "unknown_command" }));
    });

    ws.on("close", () => {
      clients.delete(ws);
    });
  });

  // Forward match/trade events to subscribed clients
  matchEvents.on("trade", (trade) => {
    broadcast({ type: "trade", data: trade }, (meta) => meta.subscriptions.has("trades"));
  });

  // simple ticker simulator: broadcast every 3s to 'ticker' subscribers
  setInterval(() => {
    // You can replace this with real market data later
    const ticker = {
      pair: "BTC/USDT",
      price: (9800 + Math.random() * 400).toFixed(2),
      ts: Date.now()
    };
    broadcast({ type: "ticker", data: ticker }, (meta) => meta.subscriptions.has("ticker"));
  }, 3000);

  // heartbeat: send connection counts for debugging to 'meta' subscribers
  setInterval(() => {
    const meta = { type: "meta", clients: clients.size, ts: Date.now() };
    broadcast(meta, (m) => m.subscriptions.has("meta"));
  }, 10000);

  console.log("WebSocket server initialized on /ws");
  return wss;
}