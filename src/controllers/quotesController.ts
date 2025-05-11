import { Request, Response } from 'express';
import { fetchQuotes } from '../services/favqsService';

// Store last count per user (for demo, using in-memory object; in production, use a persistent store)
const userLastCount: Record<string, number> = {};

export const getQuotesHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log('Received request:', req.query);
    const userId = req.ip || ''; // Use IP as a simple user identifier (replace with real user ID if available)
    let count = Math.min(Math.max(Number(req.query.count) || 1, 1), 50);
    const tag = req.query.tag?.toString();

    // Check if user sent the same count as last time
    if (userLastCount[userId] === count) {
      count = Math.min(count + 1, 50); // Increment count, but not above 50
    }
    userLastCount[userId] = count;

    const quotes = await fetchQuotes(count, tag);
    res.json(quotes);
  } catch {
    res.status(500).json({ error: 'An unexpected error occurred. Please try again later.' });
  }
};