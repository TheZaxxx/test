// very small client helper to manage WS lifecycle for frontend pages/components
const WS_URL = (process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:5000") + "/ws";

export default function createSocket(onMessage) {
  let ws;
  let reconnectTimer = null;

  function connect() {
    ws = new WebSocket(WS_URL);

    ws.onopen = () => {
      console.log("[ws] open", WS_URL);
      // auto-subscribe to helpful channels
      ws.send(JSON.stringify({ type: "subscribe", channel: "trades" }));
      ws.send(JSON.stringify({ type: "subscribe", channel: "ticker" }));
    };

    ws.onmessage = (ev) => {
      try {
        const msg = JSON.parse(ev.data);
        onMessage && onMessage(msg);
      } catch (e) {
        console.warn("[ws] parse error", e);
      }
    };

    ws.onclose = () => {
      console.log("[ws] closed, reconnect in 2s");
      if (!reconnectTimer) reconnectTimer = setTimeout(() => { reconnectTimer = null; connect(); }, 2000);
    };

    ws.onerror = (err) => {
      console.warn("[ws] error", err);
      ws.close();
    };
  }

  connect();

  return {
    send(obj) {
      if (ws && ws.readyState === WebSocket.OPEN) ws.send(JSON.stringify(obj));
    },
    close() {
      if (ws) ws.close();
    }
  };
}