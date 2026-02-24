import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

import ordersRouter from './routes/orders';
import investmentsRouter from './routes/investments';
import propertiesRouter from './routes/properties';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/orders', ordersRouter);
app.use('/api/investments', investmentsRouter);
app.use('/api/properties', propertiesRouter);


app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Basic Property Routes
app.get('/api/properties', async (req, res) => {
  try {
    const properties = await prisma.property.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(properties);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
