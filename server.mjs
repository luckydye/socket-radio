import express from "express";

const app = express();
const PORT = 3000;

app.use('/host', express.static('host/dist'));
app.use('/listen', express.static('client/dist'));

app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));