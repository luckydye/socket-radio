console.log("client");

import { Peer } from "peerjs";

function log(msg: string) {
  document.write(`
    <div>
      ${msg}
    </div>
  `);
}

function init() {
  const peer = new Peer("cool-luckydye-peer-id-client");

  peer.on("call", (call) => {
    log("calling");

    call.on("stream", (remoteStream) => {
      log("recieved stream");

      console.log(remoteStream.getAudioTracks());

      const video = document.createElement("video");
      video.srcObject = remoteStream;
      video.oncanplay = () => {
        video.play();
      };
    });
    call.answer(null);
  });

  peer.on("open", () => {
    peer.connect("cool-luckydye-peer-id-host");
    log("peer connect");
  });
}

window.onclick = () => init();
