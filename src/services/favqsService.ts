import axios from 'axios';
import NodeCache from 'node-cache';
import { Quote } from '../types/Quote';

const API_KEY = process.env.FAVQS_API_KEY;
const cache = new NodeCache({ stdTTL: 300 });
const MAX_RETRIES = 3;
const DELAY_MS = 500;

const delay = (ms: number) =>
  new Promise((res) => setTimeout(res, ms));

export const fetchQuotes = async (pageNumber: number, tag?: string): Promise<Quote[]> => {
  const cacheKey = `page-${pageNumber}-${tag || 'none'}`;
  if (cache.has(cacheKey)) {
    return cache.get<Quote[]>(cacheKey) || [];
  }

  let quotes: Quote[] = [];
  let attempt = 0;
  let success = false;

  while (!success && attempt < MAX_RETRIES) {
    try {
      const response = await axios.get('https://favqs.com/api/quotes', {
        headers: { Authorization: `Token token="${API_KEY}"` },
        params: tag ? { filter: tag, type: 'tag', page: pageNumber } : { page: pageNumber },
      });

      quotes = response.data.quotes as Quote[];
      success = true;
    } catch {
      attempt++;
      if (attempt < MAX_RETRIES) await delay(DELAY_MS);
    }
  }

  cache.set(cacheKey, quotes);
  return quotes;
};

function getRandomSelection(quotes: Quote[], count: number): Quote[] {
  return quotes.sort(() => Math.random() - 0.5).slice(0, count);
}
