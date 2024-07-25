import { useLocation } from 'react-router-dom';
import { styled } from 'styled-components';

const Order = () => {
  // navigator('/order', { state: orderData }); // state에 데이터를 담아서 전달
  // state로 받은 데이터 출력
  // useLocation 훅을 사용하여 location 객체를 가져옴
  const location = useLocation();
  console.log('location.state:', location.state);
  return (
    <StyledOrder>
      <h1>Order</h1>
    </StyledOrder>
  );
};

export default Order;

const StyledOrder = styled.div``;
