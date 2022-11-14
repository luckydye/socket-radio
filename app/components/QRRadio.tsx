"use client";

import QRCode from "qrcode";
import { useEffect } from "react";

export default function QRRadio() {
  useEffect(() => {
    const radioUrl = location.origin + "/proxy/3000/radio";

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
  }, []);

  return (
    <div id="qrcodediv">
      <span>Listen:</span>
      <br />
    </div>
  );
}
