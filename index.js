import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/shipments', (req, res) => {
  res.json([
    { id: 1, name: 'Shipment 1', status: 'In Transit' },
    { id: 2, name: 'Shipment 2', status: 'Delivered' }
  ]);
});

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
