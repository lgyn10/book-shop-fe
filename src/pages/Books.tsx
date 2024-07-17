import { styled } from 'styled-components';
import BooksEmpty from '../components/books/BooksEmpty';
import BooksFilter from '../components/books/BooksFilter';
import BooksList from '../components/books/BooksList';
import BooksViewSwitcher from '../components/books/BooksViewSwitcher';
import Pagination from '../components/books/Pagination';
import Title from '../components/common/Title';
import { useBooks } from '../hooks/useBooks';

const Books = () => {
  const { books, pagination } = useBooks();
  // console.log(books); // 책 목록
  // console.log(pagination); // 페이징 정보

  return (
    <>
      <Title size='large'>도서 검색 결과</Title>
      <StyledBooks>
        <BooksFilter />
        <BooksViewSwitcher />
        <BooksList />
        <BooksEmpty />
        <Pagination />
      </StyledBooks>
    </>
  );
};

export default Books;

const StyledBooks = styled.div``;
