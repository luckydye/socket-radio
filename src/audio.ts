import AudioStreamMeterVertecal from "./components/AudioMeterVertical";

// @ts-ignore
let audioCtx: AudioContext;

export async function initAudio() {
  audioCtx = new AudioContext();

  await audioCtx.audioWorklet.addModule("audio/capture.js");
  await audioCtx.audioWorklet.addModule("audio/player.js");
  await audioCtx.audioWorklet.addModule("audio/meter.js");
}

window.onclick = () => {
  if (audioCtx) {
    audioCtx.resume();
  }
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

  const meter = new AudioStreamMeterVertecal(audioCtx, "output");
  meter.setAudioSourceNode(player);
  document.body.append(meter);

  player.onprocessorerror = console.error;

  console.log("player connected");

  return {
    playbuffer(buffer: Float32Array[]) {
      player.port.postMessage(buffer);
    },
  };
}
