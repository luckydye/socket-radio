import type { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // @ts-ignore
  if (!res.socket.server.io) {
    console.log("*First use, starting socket.io");

    // @ts-ignore
    const io = new Server(res.socket.server);

    io.on("connection", (socket) => {
      console.log("new connection");

      socket.broadcast.emit("a user connected");
      socket.on("hello", (msg) => {
        socket.emit("hello", "world!");
      });
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
