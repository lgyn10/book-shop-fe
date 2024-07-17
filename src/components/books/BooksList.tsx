import { styled } from 'styled-components';
import BookItem from './BookItem';

const dummyBook = {
  id: 1,
  title: 'Dummy Book',
  img: 5,
  category_id: 1,
  summary: 'This is a dummy book',
  author: 'John Doe',
  price: 12000,
  likes: 10,
  form: 'paperback',
  isbn: 'Dummy isbn',
  detail: 'Lorem ipsumh dolor sit amet, consectetur adipiscing elit.',
  pages: 200,
  contents: 'Dummy contents',
  pubDate: '2022-01-01',
};

const BooksList = () => {
  return (
    <StyledBooksList>
      <BookItem book={dummyBook} />
    </StyledBooksList>
  );
};

export default BooksList;

const StyledBooksList = styled.div``;
