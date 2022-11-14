import QRCode from "qrcode";

const radioUrl = "test";

QRCode.toDataURL(radioUrl)
  .then((url) => {
    const img = new Image();
    img.src = url;
    // @ts-ignore
    qrcodediv.append(img);
  })
  .catch((err) => {
    console.error(err);
  });
