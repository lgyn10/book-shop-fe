import BookReviewAdd from '@/components/bookDetail/BookReviewAdd';
import BookReviewItem from '@/components/bookDetail/BookReviewItem';
import { BookReviewItemWirte, BookReviewItem as IBookReviewItem } from '@/models/book.model';
import { styled } from 'styled-components';

interface Props {
  reviews: IBookReviewItem[];
  onAdd: (data: BookReviewItemWirte) => void;
}
const BookReview = ({ reviews, onAdd }: Props) => {
  return (
    <StyledBookReview>
      <BookReviewAdd onAdd={onAdd} />
      {reviews.map((review) => {
        return <BookReviewItem key={review.id} review={review} />;
      })}
    </StyledBookReview>
  );
};

export default BookReview;

const StyledBookReview = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
