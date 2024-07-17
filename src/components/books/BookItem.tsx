import { FaHeart } from 'react-icons/fa';
import { styled } from 'styled-components';
import { Book } from '../../models/book.model';
import { formatNumber } from '../../utils/format';
import { getImgSrc } from '../../utils/image';

interface BookItemProps {
  book: Book;
}
// BookItem 구성 요소
// 이미지
// 제목
// 요약
// 저자
// 가격
// 좋아요 수
const BookItem = ({ book }: BookItemProps) => {
  return (
    <StyledBookItem>
      <div className='img'>
        <img src={getImgSrc(book.id)} alt={book.title} />
      </div>
      <div className='content'>
        <h2 className='title'>{book.title}</h2>
        <div className='summary'>{book.summary}</div>
        <div className='author'>{book.author}</div>
        <div className='price'>{formatNumber(book.price)}원</div>
        <div className='likes'>
          <FaHeart />
          {book.likes}
        </div>
      </div>
    </StyledBookItem>
  );
};

export default BookItem;

const StyledBookItem = styled.div``;
