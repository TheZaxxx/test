// place in backend/start-ws.js
// small helper to attach WS when you already start Express via server
import http from "http";
import app from "./app.js"; // existing Express app (project/backend/app.js)
import { initWebSocket } from "./utils/wsServer.js";

const PORT = process.env.PORT ? Number(process.env.PORT) : 5000;

const server = http.createServer(app);

// initialize websocket server attached to same http server
initWebSocket(server);

server.listen(PORT, () => {
  console.log(`HTTP + WS server listening on port ${PORT}`);
});