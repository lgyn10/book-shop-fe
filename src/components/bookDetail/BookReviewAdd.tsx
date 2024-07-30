import Button from '@/components/common/Button';
import { BookReviewItemWirte } from '@/models/book.model';
import { useForm } from 'react-hook-form';
import { styled } from 'styled-components';

interface IBookReviewAddProps {
  onAdd: (data: BookReviewItemWirte) => void;
}
const BookReviewAdd = ({ onAdd }: IBookReviewAddProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookReviewItemWirte>();

  return (
    <BookReviewAddStyle>
      <form onSubmit={handleSubmit(onAdd)}>
        <fieldset>
          <textarea {...register('content', { required: true })}></textarea>
        </fieldset>
        {errors.content && <p className='error-text'>리뷰 내용를 작성해주세요.</p>}
        <fieldset>
          <select {...register('score', { required: true, valueAsNumber: true })}>
            <option value='1'>1점</option>
            <option value='2'>2점</option>
            <option value='3'>3점</option>
            <option value='4'>4점</option>
            <option value='5'>5점</option>
          </select>
          <Button type='submit' size={'medium'} scheme={'primary'}>
            작성하기
          </Button>
        </fieldset>
      </form>
    </BookReviewAddStyle>
  );
};

export default BookReviewAdd;

const BookReviewAddStyle = styled.div`
  form {
    display: flex;
    flex-direction: column;
    gap: 6px;
    fieldset {
      border: 0;
      padding: 0;
      margin: 0;
      display: flex;
      gap: 12px;
      justify-content: end;
    }
    textarea {
      width: 100%;
      height: 100px;
      border: 1px solid ${({ theme }) => theme.color.border};
      border-radius: ${({ theme }) => theme.borderRadius.default};
      padding: 12px;
    }

    .error-text {
      color: red;
    }
  }
`;
