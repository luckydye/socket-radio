// audio-processor.js
class AudioDBMeter extends AudioWorkletProcessor {
  process(inputs, outputs, parameters) {
      const input = inputs[0];
      const channelCount = input.length;

      const amplitudes = [];
      const levels = [];

      for(let channel = 0; channel < channelCount; channel++) {
          let counter = 0;
          const samples = input[channel];
          for(let sample of samples) {
              counter += sample;
          }
          amplitudes[channel] = Math.abs(counter / samples.length);

          const dB = 20 * Math.log10(amplitudes[channel]);
          levels[channel] = dB;
      }
      this.port.postMessage(levels);

      return true;
  }
}

registerProcessor('audio-db-meter', AudioDBMeter);