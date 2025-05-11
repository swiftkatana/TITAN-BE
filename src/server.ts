import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
const app = express();
dotenv.config();
const PORT = process.env.PORT || 3002;

import quotesRouter from './routes/quotes';
const limiter = rateLimit({
  max: 5,
  windowMs: 60 * 1000, // 1 minute
  message: 'Too many requests, please try again later.'
});

app.use(cors());
app.use(limiter);
app.use('/quotes', quotesRouter);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));