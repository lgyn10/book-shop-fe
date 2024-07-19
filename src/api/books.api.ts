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

// likeBook 함수는 도서 ID를 받아 해당 도서의 좋아요 상태를 토글하는 함수
export const likeBook = async (bookId: number) => {
  try {
    const response = await httpClient.post<BookDetail>(`/likes/${bookId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const unlikeBook = async (bookId: number) => {
  try {
    const response = await httpClient.delete<BookDetail>(`/likes/${bookId}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
