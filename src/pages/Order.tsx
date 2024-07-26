import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { order } from '../api/order.api';
import CartSummary from '../components/cart/CartSummary';
import Button from '../components/common/Button';
import InputText from '../components/common/InputText';
import Title from '../components/common/Title';
import FindAddressButton from '../components/order/FindAddressButton';
import { useAlert } from '../hooks/useAlert';
import { Delivery, OrderRequest } from '../models/order.model';

//! react-hook-form 사용하기

interface DeliveryForm extends Delivery {
  addressDetail: string;
}

const Order = () => {
  const { showAlert, showConfirm } = useAlert();
  const navigator = useNavigate();

  // navigator('/order', { state: orderData }); // state에 데이터를 담아서 전달
  // state로 받은 데이터 출력
  // useLocation 훅을 사용하여 location 객체를 가져옴
  const location = useLocation();
  // console.log('location.state:', location.state);
  const orderDataFromCart: Omit<OrderRequest, 'delivery'> = location.state;

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }, // 에러 메시지를 출력하기 위해 errors를 가져옴
    // formState: { errors, isValid }, // isValid를 사용하여 폼 유효성을 검사할 수 있음
  } = useForm<DeliveryForm>();

  //! 폼 외부에 submit 버튼을 만들어서 사용
  const handlePayment = (data: DeliveryForm) => {
    const orderDate: OrderRequest = {
      ...orderDataFromCart,
      delivery: {
        address: `${data.address} ${data.addressDetail}`,
        receiver: data.receiver,
        contact: data.contact,
      },
    };
    // 서버로 주문 데이터를 전송
    // console.log(orderDate);
    showConfirm('주문을 진행하시겠습니까?', () => {
      order(orderDate).then((res) => {
        showAlert('주문이 처리되었습니다.');
        navigator('/orderlist');
      });
    });
  };

  return (
    <>
      <Title size={'large'}>주문서 작성</Title>
      <StyledOrder>
        <div className='content'>
          <div className='order-info'>
            <Title size='medium' color='text'>
              배송 정보
            </Title>
            <form className='delivery'>
              <fieldset>
                <label htmlFor=''>주소</label>
                <div className='input'>
                  <InputText inputType='text' {...register('address', { required: true })} />
                </div>
                <FindAddressButton
                  onCompleted={(address) => {
                    setValue('address', address);
                  }}
                />
              </fieldset>
              {errors.address && <p className='error-text'>주소를 입력해주세요</p>}
              <fieldset>
                <label htmlFor=''>상세 주소</label>
                <div className='input'>
                  <InputText inputType='text' {...register('addressDetail', { required: true })} />
                </div>
              </fieldset>
              {errors.addressDetail && <p className='error-text'>상세 주소를 입력해주세요</p>}
              <fieldset>
                <label htmlFor=''>수령인</label>
                <div className='input'>
                  <InputText inputType='text' {...register('receiver', { required: true })} />
                </div>
              </fieldset>
              {errors.receiver && <p className='error-text'>수령인을 입력해주세요</p>}
              <fieldset>
                <label htmlFor=''>전화 번호</label>
                <div className='input'>
                  <InputText inputType='text' {...register('contact', { required: true })} />
                </div>
              </fieldset>
              {errors.contact && <p className='error-text'>전화 번호를 입력해주세요</p>}
            </form>
          </div>
          <div className='order-info'>
            <Title size={'medium'} color='text'>
              주문 상품
            </Title>
            <strong>
              {orderDataFromCart.representBookTitle} 등 총 {orderDataFromCart.totalQuantity} 권
            </strong>
          </div>
        </div>
        <div className='summary'>
          <CartSummary totalQuantity={orderDataFromCart.totalQuantity} totalPrice={orderDataFromCart.totalPrice} />
          <Button size={'large'} scheme={'primary'} onClick={handleSubmit(handlePayment)}>
            {/*  onClick={handleSubmit(handlePayment)}: 폼을 제출할 때 handlePayment 함수를 실행 */}
            결제하기
          </Button>
        </div>
      </StyledOrder>
    </>
  );
};

export default Order;

const StyledOrder = styled.div`
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

  .order-info {
    h1 {
      padding: 0 0 24px 0;
    }
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.borderRadius.default};
    padding: 12px;
  }

  .delivery {
    fieldset {
      border: 0;
      margin: 0;
      padding: 0 0 12px 0;
      display: flex;
      justify-content: start;
      gap: 8px;

      label {
        width: 80px;
      }
      .input {
        flex: 1; // input 영역이 늘어나도록 설정, label을 제외한 나머지 영역이 늘어남
        input {
          width: 100%; // input이 부모 요소에 꽉 차도록 설정
        }
      }
    }
    .error-text {
      color: red;
      margin: 0;
      padding: 0 0 12px 0;
      text-align: right;
    }
  }
`;
