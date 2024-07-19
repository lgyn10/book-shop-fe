import { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { useBook } from '../../hooks/useBook';
import { BookDetail } from '../../models/book.model';
import Button from '../common/Button';
import InputText from '../common/InputText';

interface AddToCartProps {
  book: BookDetail;
}

const AddToCart = ({ book }: AddToCartProps) => {
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart, cartAdded } = useBook(book.id.toString());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 0값을 넣으록 했을 때 & 백스페이스로 공백을 넣었을 때 -> 빈 문자열로 변경
    if (e.target.value === '0' || e.target.value === '') {
      setQuantity(1);
      return;
    }
    setQuantity(Number(e.target.value));
  };
  const increase = () => {
    setQuantity((prev) => prev + 1);
  };
  const decrease = () => {
    if (quantity === 1) return;
    setQuantity((prev) => prev - 1);
  };

  return (
    <StyledAddToCart $added={cartAdded}>
      <div>
        <InputText className='input' type='number' value={quantity} onChange={handleChange} min={1} />
        <Button size={'medium'} scheme={'normal'} onClick={increase}>
          +
        </Button>
        <Button size={'medium'} scheme={'normal'} onClick={decrease}>
          -
        </Button>
      </div>
      <Button size={'medium'} scheme={'primary'} onClick={() => addToCart(quantity)}>
        장바구니 담기
      </Button>
      {/* {cartAdded && ()}  => 조건부 렌더링 대신 몇 초간 보여주는 방식으로 변경한다. */}
      <div className='added'>
        <p>장바구니에 추가되었습니다.</p>
        <Link to='/carts'>장바구니로 이동</Link>
      </div>
    </StyledAddToCart>
  );
};

export default AddToCart;

interface StyledAddToCartProps {
  $added: boolean;
}

const StyledAddToCart = styled.div<StyledAddToCartProps>`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  // input[type='number']의 화살표 숨기기
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  input[type='number']::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .added {
    position: absolute;
    right: 0;
    bottom: -90px;
    background-color: ${({ theme }) => theme.color.background};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    padding: 0.5rem 0.75rem;
    opacity: ${({ $added }) => ($added ? 1 : 0)};
    transition: all 0.5s ease-in;
    p {
      margin: 0;
      padding: 0 0 0.5rem 0;
    }
  }
`;
