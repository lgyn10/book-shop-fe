import { styled } from 'styled-components';

import BookEmpty from '../components/books/BookEmpty';
import BooksFilter from '../components/books/BooksFilter';
import BooksList from '../components/books/BooksList';
import BooksViewSwitcher from '../components/books/BooksViewSwitcher';
import Pagination from '../components/books/Pagination';
import Title from '../components/common/Title';
import { useBooks } from '../hooks/useBooks';

const Books = () => {
  const { books, pagination, isEmpty } = useBooks();
  // console.log(books); // 책 목록
  // console.log(pagination); // 페이징 정보

  return (
    <>
      <Title size='large'>도서 검색 결과</Title>
      <StyledBooks>
        <div className='filter'>
          <BooksFilter />
          <BooksViewSwitcher />
        </div>
        {!isEmpty && <BooksList books={books} />}
        {isEmpty && <BookEmpty />}
        {!isEmpty && <Pagination pagination={pagination} />}
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
