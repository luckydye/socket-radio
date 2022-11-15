class AudioCapture extends AudioWorkletProcessor {

  process (inputs, outputs, parameters) {

    const input = inputs[0];
    const output = outputs[0];

    this.port.postMessage(input);

    for (let channel = 0; channel < input.length; channel++) {
      const inputChannel = input[channel];
      const outputChannel = output[channel];

      for (let sample = 0; sample < inputChannel.length; sample++) {
        outputChannel[sample] = inputChannel[sample];
      }
    }

    return true;
  }

};

registerProcessor("capture", AudioCapture);