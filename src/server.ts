import express from 'express';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import quotesRouter from './routes/quotes';

const app = express();
const PORT = process.env.PORT || 3002;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(cors());
app.use(limiter);
app.use('/quotes', quotesRouter);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));