import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';
import { QUERYSTRING } from '../../constants/querystring';
import { Book } from '../../models/book.model';
import BookItem from './BookItem';
import { ViewMode } from './BooksViewSwitcher';

// const dummyBook = { id: 1, title: 'Dummy Book', img: 5, category_id: 1, summary: 'This is a dummy book', author: 'John Doe', price: 12000, likes: 10, form: 'paperback', isbn: 'Dummy isbn', detail: 'Lorem ipsumh dolor sit amet, consectetur adipiscing elit.', pages: 200, contents: 'Dummy contents', pubDate: '2022-01-01' };

interface Props {
  books: Book[];
}

const BooksList = ({ books }: Props) => {
  const [view, setView] = useState<ViewMode>('grid');
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get(QUERYSTRING.VIEW)) {
      setView(params.get(QUERYSTRING.VIEW) as ViewMode);
    }
  }, [location.search]);

  return (
    <StyledBooksList view={view}>
      {books.map((book) => (
        <BookItem key={book.id} book={book} view={view} />
      ))}
    </StyledBooksList>
  );
};

export default BooksList;

interface StyledBooksListProps {
  view: ViewMode;
}

const StyledBooksList = styled.div<StyledBooksListProps>`
  display: grid;
  grid-template-columns: ${({ view }) => (view === 'grid' ? 'repeat(4,1fr)' : 'repeat(1,1fr)')};
  gap: 24px;
`;
