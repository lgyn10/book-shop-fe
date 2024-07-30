import { reviewsById } from '@/mock/review';
import { setupWorker } from 'msw/browser';

const handlers = [reviewsById];

export const worker = setupWorker(...handlers);
