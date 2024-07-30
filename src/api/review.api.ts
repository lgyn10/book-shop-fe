import { requestHandler } from '@/api/http';
import { BookReviewItem, BookReviewItemWirte } from '@/models/book.model';

export const fetchBookReviews = async (bookId: number) => {
  return await requestHandler<BookReviewItem>('get', `/reviews/${bookId}`);
};

export const addBookReview = async (bookId: string, data: BookReviewItemWirte) => {
  return await requestHandler('post', `/reviews/${bookId}`, data);
};
