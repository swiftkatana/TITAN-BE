import express from 'express';
import { getQuotesHandler } from '../controllers/quotesController';

const router = express.Router();
router.get('/', getQuotesHandler);
export default router;