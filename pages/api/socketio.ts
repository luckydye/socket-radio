import type { NextApiRequest, NextApiResponse } from "next";
import { Server, Socket } from "socket.io";

const connections: Set<Socket> = new Set();

function loop() {
  for (let socket of connections) {
    socket.emit("hello world!");
  }

  console.log("tick");

  setTimeout(loop, 1000 / 5);
}

function start() {
  console.log("starting loop");
  loop();
}
start();

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // @ts-ignore
  if (!res.socket.server.io) {
    console.log("*First use, starting socket.io");

    // @ts-ignore
    const io = new Server(res.socket.server);

    io.on("connection", (socket: Socket) => {
      console.log("new connection");

      connections.add(socket);

      socket.broadcast.emit("a user connected");
    });

    // @ts-ignore
    res.socket.server.io = io;
  }
  res.end();
}

export const config = {
  api: {
    bodyParser: false,
  },
};
