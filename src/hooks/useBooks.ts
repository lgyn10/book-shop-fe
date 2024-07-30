import { useQuery } from 'react-query';
import { useLocation } from 'react-router-dom';
import { fetchBooks } from '../api/books.api';
import { LIMIT } from '../constants/pagination';
import { QUERYSTRING } from '../constants/querystring';

export const useBooks = () => {
  const location = useLocation();

  // key: ['books', location.search]
  // key에 의해서 캐시가 구분됨
  // location.search가 변경되면 useQuery 훅이 다시 실행됨
  // location.search가 변경되지 않으면 캐시된 데이터를 반환
  // 'books' 키는 책 목록을 가져오는 요청을 구분하기 위한 키
  const { data: booksData, isLoading: isBooksLoading } = useQuery(['books', location.search], () => {
    const params = new URLSearchParams(location.search);
    const categoryId = params.get(QUERYSTRING.CATEGORY_ID) ? Number(params.get(QUERYSTRING.CATEGORY_ID)) : undefined;
    const news = params.get(QUERYSTRING.NEWS) ? true : undefined;
    const currentPage = params.get(QUERYSTRING.PAGE) ? Number(params.get(QUERYSTRING.PAGE)) : 1;
    const limit = LIMIT;

    return fetchBooks({ categoryId, news, currentPage, limit });
  });

  //! useQuery에서 data가 아래의 코드를 대체함
  // const [books, setBooks] = useState<Book[]>([]);
  // const [pagination, setPagination] = useState<Pagination>({ totalCount: 0, currentPage: 1 });
  // const [isEmpty, setIsEmpty] = useState(true);

  // useEffect(() => {
  //   // URLSearchParams 인스턴스를 생성하고 search 속성을 전달
  //   const params = new URLSearchParams(location.search);

  //   const categoryId = params.get(QUERYSTRING.CATEGORY_ID) ? Number(params.get(QUERYSTRING.CATEGORY_ID)) : undefined;
  //   const news = params.get(QUERYSTRING.NEWS) ? true : undefined;
  //   const currentPage = params.get(QUERYSTRING.PAGE) ? Number(params.get(QUERYSTRING.PAGE)) : 1;
  //   const limit = LIMIT;

  //   // fetchBooks 함수를 호출하여 책 목록을 가져옴
  //   fetchBooks({ categoryId, news, currentPage, limit }).then(({ books, pagination }) => {
  //     setBooks(books); // 책 목록을 업데이트
  //     setPagination(pagination); // 페이징 정보를 업데이트
  //     setIsEmpty(books.length === 0); // 책 목록이 비어있는지 확인
  //   });
  // }, [location.search]);

  return {
    books: booksData?.books,
    pagination: booksData?.pagination,
    isEmpty: booksData?.books.length === 0,
    isBooksLoading,
  };
};
