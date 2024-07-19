import { FaHeart } from 'react-icons/fa';
import { styled } from 'styled-components';
import { BookDetail } from '../../models/book.model';
import Button from '../common/Button';

interface LikeButtonProps {
  book: BookDetail;
  onClick: () => void;
}

// 좋아요 버튼
const LikeButton = ({ book, onClick }: LikeButtonProps) => {
  return (
    <StyledLikeButton size={'medium'} scheme={book.liked ? 'like' : 'normal'} onClick={onClick}>
      <FaHeart />
      {book.likes}
    </StyledLikeButton>
  );
};

export default LikeButton;

const StyledLikeButton = styled(Button)`
  display: flex;
  gap: 0.5rem;
  svg {
    color: inherit; // 부모 요소의 색상 상속
    * {
      color: inherit; // 부모 요소의 색상 상속
    }
  }
`;
