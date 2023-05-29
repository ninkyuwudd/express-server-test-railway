import express from 'express';
import cors from 'cors';
import apotekRoute from "./routes/apotek";
import poliumumRoute from "./routes/poliumum";

export const app = express();

app.use(cors({ origin: true }));

app.use(express.json());
app.use(express.raw({ type: 'application/vnd.custom-type' }));
app.use(express.text({ type: 'text/html' }));

// Healthcheck endpoint
app.get('/', (req, res) => {
  res.status(200).send({ status: 'ok' });
});


app.use("/apotek",apotekRoute)
app.use("/poliumum",poliumumRoute)

