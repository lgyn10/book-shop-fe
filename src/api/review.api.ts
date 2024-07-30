import { requestHandler } from '@/api/http';
import { BookReviewItem } from '@/models/book.model';

export const fetchBookReviews = async (bookId: number) => {
  return await requestHandler<BookReviewItem>('get', `/reviews/${bookId}`);
};
