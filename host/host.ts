console.log("host");

import { Peer } from "peerjs";
import QRCode from "qrcode";

const radioUrl = `${location.origin}/listen`;

QRCode.toDataURL(radioUrl)
  .then((url) => {
    const img = new Image();
    img.src = url;
    // @ts-ignore
    qrcodediv.append(img);
  })
  .catch((err) => {
    console.error(err);
  });

async function init() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

  const peer = new Peer("cool-luckydye-peer-id-host");

  peer.on("connection", (conn) => {
    conn.on("open", async () => {
      peer.call(conn.peer, stream);
    });
  });
}

init();
