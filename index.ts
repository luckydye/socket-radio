import express from "express";
import http from "node:http";

const app = express();
const server = http.createServer(app);

app.use("/", express.static("dist"));

server.listen(3000, () => {
  console.log("listening on 0.0.0.0:3000");
});
