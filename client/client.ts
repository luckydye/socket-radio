console.log("client");

import { Peer } from "peerjs";
import AudioStreamMeterVertecal from "./components/AudioMeterVertical";

function log(msg: string) {
  document.write(`
    <div>
      ${msg}
    </div>
  `);
}

async function init() {
  const peer = new Peer("cool-luckydye-peer-id-client");

  peer.on("call", (call) => {
    log("calling");

    call.on("stream", async (remoteStream) => {
      log("recieved stream");

      console.log(remoteStream.getAudioTracks());

      const video = document.createElement("video");
      video.srcObject = remoteStream;
      video.oncanplay = () => {
        video.play();
      };

      const audioCtxt = new AudioContext();
      await audioCtxt.audioWorklet.addModule("./audio/meter.js");
      const meter = new AudioStreamMeterVertecal(audioCtxt, "output");
      meter.setSourceStream(remoteStream);
      document.body.append(meter);
    });
    call.answer(null);
  });

  peer.on("open", () => {
    peer.connect("cool-luckydye-peer-id-host");
    log("peer connect");
  });
}

window.onclick = () => init();
