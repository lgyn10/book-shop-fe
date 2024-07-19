import { Book, BookDetail } from '../models/book.model';
import { Pagination } from '../models/pagination.model';
import { httpClient } from './http';

interface FetchBooksParams {
  categoryId?: number;
  news?: boolean;
  currentPage?: number;
  limit: number;
}

interface FetchBooksResponse {
  books: Book[];
  pagination: Pagination;
}

export const fetchBooks = async (params: FetchBooksParams) => {
  try {
    const response = await httpClient.get<FetchBooksResponse>('/books', { params });
    return response.data;
  } catch (error) {
    return {
      books: [],
      pagination: {
        totalCount: 0,
        currentPage: 1,
      },
    };
  }
};

// bookId : stirng - 파라미터로 받은 도서 ID
export const fetchBook = async (bookId: string) => {
  try {
    const response = await httpClient.get<BookDetail>(`/books/${bookId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
