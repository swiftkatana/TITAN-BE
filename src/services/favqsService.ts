import axios from 'axios';
import NodeCache from 'node-cache';
import { Quote } from '../types/Quote';

const API_KEY = process.env.FAVQS_API_KEY ;
const cache = new NodeCache({ stdTTL: 300 });
const MAX_RETRIES = 3;
const DELAY_MS = 500;

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

const FALLBACK_QUOTES: Quote[] = [
  {
    id: 1,
    body: 'Be yourself; everyone else is already taken.',
    author: 'Oscar Wilde',
    tags: ['inspirational'],
    favorite: false,
    author_permalink: 'oscar-wilde',
    url: '',
    favorites_count: 0,
    upvotes_count: 0,
    downvotes_count: 0,
    dialogue: false
  }
];

export const fetchQuotes = async (count: number, tag?: string): Promise<Quote[]> => {
  const cacheKey = `quotes-${count}-${tag || 'none'}`;
  const cached = cache.get<Quote[]>(cacheKey);
  if (cached) return cached;

  const resultQuotes: Quote[] = [];
  let page = 1;
  let lastPage = false;

  while (resultQuotes.length < count && !lastPage) {
    let success = false;
    let attempt = 0;
    while (!success && attempt < MAX_RETRIES) {
      try {
        const response = await axios.get('https://favqs.com/api/quotes', {
          headers: { Authorization: `Token token="${API_KEY}"` },
          params: tag ? { filter: tag, type: 'tag', page } : { page },
        });
        const quotes = response.data.quotes as Quote[];
        lastPage = response.data.last_page === true;
        if (!Array.isArray(quotes) || !quotes.length) break;
        resultQuotes.push(...quotes);
        success = true;
      } catch {
        attempt++;
        if (attempt < MAX_RETRIES) await delay(DELAY_MS);
      }
    }
    page++;
  }

  const uniqueQuotes = Array.from(new Map(resultQuotes.map(q => [q.body, q])).values());
  const outputQuotes = uniqueQuotes.sort(() => Math.random() - 0.5).slice(0, count);
  cache.set(cacheKey, outputQuotes);
  return outputQuotes.length ? outputQuotes : FALLBACK_QUOTES.slice(0, count);
};