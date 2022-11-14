"use client";

import { useEffect } from "react";
import io from "socket.io-client";

let socket;

export default function Page() {
  useEffect(() => {
    const socketInitializer = async () => {
      await fetch("/api/socketio");
      socket = io();

      socket.on("connect", () => {
        console.log("connected");
      });

      socket.on("message", (msg) => {
        console.log(msg);
      });
    };
    socketInitializer();
  }, []);

  return (
    <div>
      <span>Playing radio...</span>
    </div>
  );
}
