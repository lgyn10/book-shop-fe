import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { Book } from '../../models/book.model';
import { formatNumber } from '../../utils/format';
import { getImgSrc } from '../../utils/image';
import { ViewMode } from './BooksViewSwitcher';

interface BookItemProps {
  book: Book;
  view?: ViewMode;
}
// BookItem 구성 요소
// 이미지
// 제목
// 요약
// 저자
// 가격
// 좋아요 수
const BookItem = ({ book, view }: BookItemProps) => {
  return (
    <StyledBookItem view={view}>
      <Link to={`/book/${book.id}`}>
        <div className='img'>
          <img src={getImgSrc(book.img)} alt={book.title} />
        </div>
        <div className='content'>
          <h2 className='title'>{book.title}</h2>
          <div className='summary'>{book.summary}</div>
          <div className='author'>{book.author}</div>
          <div className='price'>{formatNumber(book.price)}원</div>
          <div className='likes'>
            <FaHeart data-testid='like-icon' />
            {book.likes}
          </div>
        </div>
      </Link>
    </StyledBookItem>
  );
};

export default BookItem;

const StyledBookItem = styled.div<Pick<BookItemProps, 'view'>>`
  // Pick: BookItemProps에서 view만 가져옴
  a {
    display: flex;
    flex-direction: ${({ view }) => (view === 'grid' ? 'column' : 'row')};
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    text-decoration: none;
  }

  .img {
    border-radius: ${({ theme }) => theme.borderRadius.default};
    overflow: hidden;
    width: ${({ view }) => (view === 'grid' ? 'auto' : '160px')};
    img {
      width: 100%;
    }
  }

  .content {
    position: relative; // 좋아요 수를 절대 위치로 설정하기 위해
    padding: 1rem;
    flex: ${({ view }) => (view === 'grid' ? '0' : '1')}; // grid 뷰일 때 이미지와 내용이 겹치지 않도록 설정
    .title {
      font-size: 1.25rem;
      font-weight: 700;
      margin: 0 0 12px 0;
    }
    .summary .author {
      font-size: 0.875rem;
      color: ${({ theme }) => theme.color.secondary};
    }
    .price {
      font-size: 1rem;
      font-weight: 700;
      color: ${({ theme }) => theme.color.secondary};
    }
    .likes {
      display: inline-flex; // 좋아요 아이콘과 텍스트를 가로로 정렬
      align-items: center;
      gap: 4px;
      font-size: 0.875rem;
      margin-bottom: 0.25rem;
      color: ${({ theme }) => theme.color.primary};
      border: 1px solid ${({ theme }) => theme.color.border};
      border-radius: ${({ theme }) => theme.borderRadius.default};
      padding: 4px 12px;
      position: absolute; // 부모 요소인 .content에 상대적으로 위치
      bottom: 1rem;
      right: 1rem;
      svg {
        color: ${({ theme }) => theme.color.primary};
        margin-right: 0.25rem;
        padding: 0;
      }
    }
  }
`;
