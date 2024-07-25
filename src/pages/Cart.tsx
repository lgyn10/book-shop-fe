import { useMemo, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import Button from '../components/common/Button';
import Empty from '../components/common/Empty';
import Title from '../components/common/Title';
import { useAlert } from '../hooks/useAlert';
import { useCart } from '../hooks/useCart';
import { OrderRequest } from '../models/order.model';

//! 하나 남은 장바구니를 삭제했을 때, "장바구니가 비어있습니다." 컴포넌트가 나오지 않고, 빈 화면으로 남아있는 문제가 있음.

const Cart = () => {
  const { carts, deleteCartItem, isEmpty } = useCart();
  const [checkedItem, setCheckItem] = useState<number[]>([]);
  const { showAlert, showConfirm } = useAlert();
  const navigator = useNavigate();

  const handleCheckItem = (id: number) => {
    if (checkedItem.includes(id)) {
      setCheckItem(checkedItem.filter((item) => item !== id));
    } else {
      setCheckItem([...checkedItem, id]);
    }
  };

  const handleItemDelete = (id: number) => {
    // 삭제 행위
    deleteCartItem(id);
  };

  const getTotalQuantity = useMemo(() => {
    return carts.reduce((acc, cart) => {
      if (checkedItem.includes(cart.cart_items_id)) {
        return acc + cart.quantity;
      }
      return acc; // checkedItem에 포함되어 있지 않은 경우
    }, 0);
  }, [carts, checkedItem]);

  const getTotalPrice = useMemo(() => {
    return carts.reduce((acc, cart) => {
      if (checkedItem.includes(cart.cart_items_id)) {
        return acc + cart.price * cart.quantity;
      }
      return acc;
    }, 0);
  }, [carts, checkedItem]);

  //! 주문하기 버튼 핸들러
  const handleOrder = () => {
    if (checkedItem.length === 0) {
      showAlert('주문할 상품을 선택해주세요');
      return;
    }
    // 주문서 작성으로 데이터 전달
    const orderData: Omit<OrderRequest, 'delivery'> = {
      items: checkedItem,
      totalPrice: getTotalPrice,
      totalQuatity: getTotalQuantity,
      firstBookTitle: carts[0].title,
    };
    // console.log(orderData);
    showConfirm('주문서 작성 페이지로 이동하시겠습니까?', () => {
      // order라는 라우터에 데이터를 전달해줘야 한다. (주문서 작성 페이지로 이동)
      // 라우트 사이에 데이터를 전달하는 방법으로 useNavigate를 사용
      navigator('/order', { state: orderData }); // state에 데이터를 담아서 전달
    });
  };

  return (
    <>
      <Title size='large'>장바구니</Title>
      <StyledCart>
        {!isEmpty && (
          <div className='content'>
            {carts.map((cart) => (
              <CartItem
                key={cart.cart_items_id}
                cart={cart}
                checkedItem={checkedItem}
                onCheck={handleCheckItem}
                onDelete={handleItemDelete}
              />
            ))}
          </div>
        )}
        {/* FaShoppingCart 아이콘을 사용하여 장바구니가 비어있을 때 보여줄 Empty 컴포넌트 - React.ReactNode */}
        {isEmpty && <Empty title={'장바구니가 비어있습니다'} icon={<FaShoppingCart />} />}
        <div className='summary'>
          <CartSummary totalQuantity={getTotalQuantity} totalPrice={getTotalPrice} />
          <Button size={'large'} scheme={'primary'} onClick={handleOrder}>
            주문하기
          </Button>
        </div>
      </StyledCart>
    </>
  );
};

export default Cart;

const StyledCart = styled.div`
  display: flex;
  gap: 24px;
  justify-content: space-between;
  padding: 24px 0;

  .content {
    flex: 1; // content 영역이 늘어나도록 설정
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .summary {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
`;
