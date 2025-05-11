import { Request, Response } from 'express';
import { fetchQuotes } from '../services/favqsService';

export const getQuotesHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const count = Math.min(Math.max(Number(req.query.count) || 1, 1), 50);
    const tag = req.query.tag?.toString();
    const quotes = await fetchQuotes(count, tag);
    res.json(quotes);
  } catch {
    res.status(500).json({ error: 'An unexpected error occurred. Please try again later.' });
  }
};