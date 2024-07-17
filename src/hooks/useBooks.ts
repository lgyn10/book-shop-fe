import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchBooks } from '../api/books.api';
import { LIMIT } from '../constants/pagination';
import { QUERYSTRING } from '../constants/querystring';
import { Book } from '../models/book.model';
import { Pagination } from '../models/pagination.model';

export const useBooks = () => {
  const location = useLocation();

  const [books, setBooks] = useState<Book[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ totalCount: 0, currentPage: 1 });
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    // URLSearchParams 인스턴스를 생성하고 search 속성을 전달
    const params = new URLSearchParams(location.search);

    const categoryId = params.get(QUERYSTRING.CATEGORY_ID) ? Number(params.get(QUERYSTRING.CATEGORY_ID)) : undefined;
    const news = params.get(QUERYSTRING.NEWS) ? true : undefined;
    const currentPage = params.get(QUERYSTRING.PAGE) ? Number(params.get(QUERYSTRING.PAGE)) : 1;
    const limit = LIMIT;

    // fetchBooks 함수를 호출하여 책 목록을 가져옴
    fetchBooks({ categoryId, news, currentPage, limit }).then(({ books, pagination }) => {
      setBooks(books); // 책 목록을 업데이트
      setPagination(pagination); // 페이징 정보를 업데이트
      setIsEmpty(books.length === 0); // 책 목록이 비어있는지 확인
    });
  }, [location.search]);

  return { books, pagination, isEmpty };
};
