// server.js
const WebSocket = require("ws");
const http = require("http");
const server = http.createServer();
const wss = new WebSocket.Server({ server });
const clients = new Map();

wss.on("connection", function connection(ws) {
  const id = Date.now().toString();
  const metadata = { id };
  clients.set(ws, metadata);

  ws.on("message", function message(data) {
    for (const [client] of clients) {
      if (client !== ws) {
        client.send(data.toString());
      }
    }
  });

  ws.on("close", () => {
    clients.delete(ws);
  });
});

server.listen(10000, () => {
  console.log("WebSocket server running on port 10000");
});
