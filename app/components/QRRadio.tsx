"use client";

import QRCode from "qrcode";

let init = false;

export default function QRRadio() {
  const radioUrl = location.origin + "/proxy/3000/radio";

  if (!init) {
    QRCode.toDataURL(radioUrl, {
      margin: 0,
    })
      .then((url) => {
        const img = new Image();
        img.src = url;
        // @ts-ignore
        qrcodediv.append(img);
        console.log(radioUrl);
      })
      .catch((err) => {
        console.error(err);
      });
    init = true;
  }

  return (
    <div id="qrcodediv">
      <span>Listen:</span>
      <br />
    </div>
  );
}
