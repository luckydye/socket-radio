import express from "express";
import * as http from "node:http";
import * as WebSocket from "ws";

const app = express();

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const connections: Set<WebSocket> = new Set();

wss.on("connection", (ws: WebSocket) => {
  console.log("new connection");

  ws.on("message", (message: Blob) => {
    for (let socket of connections) {
      // if (socket != ws) {
      socket.send(message);
      // }
    }
  });

  ws.send("pong");

  ws.on("close", () => {
    connections.delete(ws);
    console.log("connection killed");
  });

  ws.on("error", () => {
    connections.delete(ws);
    console.log("connection killed");
  });

  connections.add(ws);
});

app.use("/", express.static("dist"));

server.listen(3001, () => {
  console.log("listening on 0.0.0.0:3001");
});
