import { useEffect, useState } from 'react';
import { fetchBook } from '../api/books.api';
import { BookDetail } from '../models/book.model';

// 파라미터로 전달받은 bookId에 해당하는 책 정보를 가져오는 useBook 훅을 구현
export const useBook = (bookId: string | undefined) => {
  const [book, setBook] = useState<BookDetail | null>(null);

  useEffect(() => {
    // bookId가 없으면 함수를 종료
    if (!bookId) return;

    fetchBook(bookId).then((book) => {
      setBook(book ?? null);
    });
  }, [bookId]);

  return { book };
};
