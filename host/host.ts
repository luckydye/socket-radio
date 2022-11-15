console.log("host");

import { Peer } from "peerjs";
import QRCode from "qrcode";

const radioUrl = `http://serve.code.luckydye.de/listen/`;

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
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: {
      autoGainControl: false,
      channelCount: 2,
      echoCancellation: false,
      latency: 0,
      noiseSuppression: false,
      sampleRate: 48000,
      sampleSize: 16,
    },
  });

  const peer = new Peer("cool-luckydye-peer-id-host");

  peer.on("connection", (conn) => {
    conn.on("open", async () => {
      peer.call(conn.peer, stream, {
        sdpTransform(sdp: string) {
          console.log(sdp);
          return sdp;
        },
      });
    });
  });
}

init();
