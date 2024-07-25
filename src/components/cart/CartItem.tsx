import { useMemo } from 'react';
import { styled } from 'styled-components';
import { Cart } from '../../models/cart.model';
import { formatNumber } from '../../utils/format';
import Button from '../common/Button';
import Title from '../common/Title';
import CheckIconButton from './CheckIconButton';

interface Props {
  cart: Cart;
  checkedItem: number[];
  onCheck: (id: number) => void;
  onDelete: (id: number) => void;
}
const CartItem = ({ cart, checkedItem, onCheck, onDelete }: Props) => {
  // checkedItem 목록에 내가 있는지 판단 = checked
  // useMemo를 사용하여 checkedItem이 변경될 때만 재계산
  // checkedItem에 cart.id가 포함되어 있는지 확인
  // useMemo: 특정 값이 변경될 때만 함수를 실행하여 값을 계산
  // useMemo와 useEffect의 차이점 : useEffect는 렌더링이 끝난 후 실행되는 반면, useMemo는 렌더링 중에 실행
  const isChecked = useMemo(() => {
    return checkedItem.includes(cart.cart_items_id);
  }, [checkedItem, cart.cart_items_id]);

  const handleCheck = () => {
    onCheck(cart.cart_items_id);
  };

  const handleDelete = () => {
    onDelete(cart.cart_items_id);
  };
  // console.log(cart);
  // console.log('cart.cart_items_id: ', cart.cart_items_id);

  return (
    <StyledCartItem>
      <div className='info'>
        <div className='check'>
          <CheckIconButton isChecked={isChecked} onCheck={handleCheck} />
        </div>
        <div>
          <Title size='medium' color='text'>
            {cart.title}
          </Title>
          <p className='summary'>{cart.summary}</p>
          <p className='price'>{formatNumber(cart.price)} 원</p>
          <p className='quantity'>{cart.quantity}</p>
        </div>
      </div>
      <Button size='medium' scheme={'normal'} onClick={handleDelete}>
        장바구니 삭제
      </Button>
    </StyledCartItem>
  );
};

export default CartItem;

const StyledCartItem = styled.div`
  display: flex; // info 부분과 버튼을 가로로 나란히 배치
  justify-content: space-between;
  align-items: start; // info 부분의 체크버튼을 위로 정렬
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  padding: 0.75rem;

  .info {
    display: flex;
    align-items: start;
    flex: 1;
    .check {
      width: 40px;
      flex-shrink: 0;
    }
  }

  p {
    padding: 0 0 8px 0;
    margin: 0;
  }
`;
