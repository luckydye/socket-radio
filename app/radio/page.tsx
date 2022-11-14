"use client";

import { useEffect } from "react";
import io from "socket.io-client";

export default function Page() {
  useEffect(() => {
    const socket = io({
      path: "/proxy/3000/api/socketio",
    });

    socket.on("connect", () => {
      console.log("connect");
      socket.emit("hello");
    });

    socket.on("hello", (data) => {
      console.log("hello", data);
    });

    socket.on("a user connected", () => {
      console.log("a user connected");
    });

    socket.on("disconnect", () => {
      console.log("disconnect");
    });
  }, []);

  return (
    <div>
      <span>Playing radio...</span>
    </div>
  );
}
