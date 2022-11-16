import QRCode from "qrcode";
import { captureAudio, initAudio, playbackAudio } from "./audio";

const radioUrl = location.href;

QRCode.toDataURL(radioUrl, {
  margin: 0,
})
  .then((url) => {
    const img = new Image();
    img.src = url;
    // @ts-ignore
    qrcodediv.append(img);
  })
  .catch((err) => {
    console.error(err);
  });

function connectToSocket() {
  const socket = new WebSocket(
    `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/`
  );

  socket.onopen = () => {
    console.log("socket open");
  };

  return socket;
}

async function initVideoAidio() {
  await initAudio();
  // @ts-ignore
  captureAudio(videoele, (buffer) => {
    socket.send(new Blob(buffer, { type: "application/octet-stream" }));
    // speaker.playbuffer(buffer);
  });

  const socket = connectToSocket();

  socket.onmessage = async (msg) => {
    if (!(msg.data instanceof Blob)) return;

    // process audio
    const buffer = await msg.data.arrayBuffer();

    const channelCount = 2;

    const audioBuffer = [];

    for (let channel = 0; channel < channelCount; channel++) {
      const channelBufferLength = buffer.byteLength / channelCount;
      const offset = channel * channelBufferLength;
      const channelBuffer = new Float32Array(
        buffer.slice(offset, offset + channelBufferLength)
      );
      audioBuffer.push(channelBuffer);
    }

    speaker.playbuffer(audioBuffer);
  };

  // some other client
  const speaker = playbackAudio();
}

initVideoAidio();
