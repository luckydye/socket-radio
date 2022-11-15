console.log("client");

import { Peer } from "peerjs";

function init() {
  const peer = new Peer("cool-luckydye-peer-id-client");

  peer.on("call", (call) => {
    call.on("stream", (remoteStream) => {
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
  });
}

window.onclick = () => init();
