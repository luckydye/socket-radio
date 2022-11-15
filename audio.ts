// @ts-ignore
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

export async function initAudio() {
  await audioCtx.audioWorklet.addModule("audio/capture.js");
  await audioCtx.audioWorklet.addModule("audio/player.js");
}

window.onclick = () => {
  audioCtx.resume();
};

export function captureAudio(
  video: HTMLVideoElement,
  callback: (buffer: Float32Array[]) => void
) {
  console.log("init capture");
  console.dir(video);

  const source = audioCtx.createMediaElementSource(video);
  const processor = new AudioWorkletNode(audioCtx, "capture");
  source.connect(processor);
  // processor.connect(audioCtx.destination);

  processor.onprocessorerror = console.error;

  processor.port.onmessage = (msg) => {
    callback(msg.data);
  };

  console.log("capture connected");
}

interface Speaker {
  playbuffer(buffer: Float32Array[]): void;
}

export function playbackAudio(): Speaker {
  console.log("init player");

  const player = new AudioWorkletNode(audioCtx, "player", {
    channelCount: 2,
  });
  player.connect(audioCtx.destination);

  player.onprocessorerror = console.error;

  console.log("player connected");

  return {
    playbuffer(buffer: Float32Array[]) {
      player.port.postMessage(buffer);
    },
  };
}
