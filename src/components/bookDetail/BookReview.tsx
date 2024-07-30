import BookReviewItem from '@/components/bookDetail/BookReviewItem';
import { BookReviewItem as IBookReviewItem } from '@/models/book.model';
import { styled } from 'styled-components';

interface Props {
  reviews: IBookReviewItem[];
}
const BookReview = ({ reviews }: Props) => {
  return (
    <StyledBookReview>
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
