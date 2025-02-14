import { styled } from 'styled-components';

import Loading from '@/components/common/Loading';
import BookEmpty from '../components/books/BookEmpty';
import BooksFilter from '../components/books/BooksFilter';
import BooksList from '../components/books/BooksList';
import BooksViewSwitcher from '../components/books/BooksViewSwitcher';
import Pagination from '../components/books/Pagination';
import Title from '../components/common/Title';
import { useBooks } from '../hooks/useBooks';

const Books = () => {
  const { books, pagination, isEmpty, isBooksLoading } = useBooks();
  // console.log(books); // 책 목록
  // console.log(pagination); // 페이징 정보

  if (isEmpty) {
    return <BookEmpty />;
  }

  // books와 pagination은 null로 리턴될 수 있음
  if (!books || !pagination || isBooksLoading) {
    return <Loading />;
  }

  console.log('isBooksLoading:', isBooksLoading); // 데이터를 가져오는 중인지 확인
  return (
    <>
      <Title size='large'>도서 검색 결과</Title>
      <StyledBooks>
        <div className='filter'>
          <BooksFilter />
          <BooksViewSwitcher />
        </div>
        <BooksList books={books} />
        <Pagination pagination={pagination} />
      </StyledBooks>
    </>
  );
};

export default Books;

const StyledBooks = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;

  .filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
  }
`;
