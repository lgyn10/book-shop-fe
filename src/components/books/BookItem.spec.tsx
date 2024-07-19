import { render, screen } from '@testing-library/react';
import { BookStoreThemeProvider } from '../../context/themeContext';
import { Book } from '../../models/book.model';
import { formatNumber } from '../../utils/format';
import BookItem from './BookItem';

// 테스트용 책 데이터
const dummyBook: Book = {
  id: 1,
  title: '테스트 책',
  summary: '이것은 요약입니다.',
  author: '홍길동',
  price: 15000,
  likes: 120,
  img: 3,
  category_id: 0,
  form: '',
  isbn: '',
  detail: '',
  pages: 0,
  contents: '',
  pub_date: '',
};

describe('BookItem', () => {
  //! 1. BookItem 컴포넌트는 책 정보를 올바르게 표시하는가?
  it('모든 책 정보를 올바르게 표시하는지 확인', async () => {
    render(
      <BookStoreThemeProvider>
        <BookItem book={dummyBook} />
      </BookStoreThemeProvider>
    );
    expect(screen.getByText(dummyBook.title)).toBeInTheDocument();
    expect(screen.getByText(dummyBook.summary)).toBeInTheDocument();
    expect(screen.getByText(dummyBook.author)).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes(formatNumber(dummyBook.price)))).toBeInTheDocument();
    expect(screen.getByText(dummyBook.likes)).toBeInTheDocument();
    expect(screen.getByAltText(dummyBook.title)).toHaveAttribute(
      'src',
      `https://picsum.photos/id/${dummyBook.img}/600/600`
      // `https://picsum.photos/id/${dummyBook.img}/600/600` 원본 코드에서는 book.id로 설정함을 테스트로 잡아냄
    );
  });

  //! 2. BookItem 컴포넌트는 좋아요 아이콘을 표시하는가?
  it('좋아요 아이콘이 표시되는지 확인', () => {
    render(
      <BookStoreThemeProvider>
        <BookItem book={dummyBook} />
      </BookStoreThemeProvider>
    );
    const likeIcon = screen.getByTestId('like-icon');
    expect(likeIcon).toBeInTheDocument();
  });
});
