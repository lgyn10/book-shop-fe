import Toast from '@/components/common/toast/Toast';
import useToastStore from '@/store/toastStore';
import { styled } from 'styled-components';

const ToastContainer = () => {
  // 상태 저장소에서 toasts 상태를 직접 선택(select)하여 가져오는 방법
  // 상태 저장소의 특정 부분만을 선택하여 컴포넌트가 리렌더링될 때 불필요한 리렌더링을 방지
  const toasts = useToastStore((state) => state.toasts);

  // useToastStore를 호출하여 저장소 전체를 반환받고, 그 반환된 객체에서 toasts 속성에 접근
  // 상태 저장소의 전체 객체를 반환받기 때문에, toasts 외의 다른 상태가 변경되어도 컴포넌트가 리렌더링될 수 있어
  // 불필요한 리렌더링이 발생할 수 있음
  // const toasts = useToastStore().toasts;

  return (
    <StlyedToastContainer>
      {toasts.map((toast) => (
        <Toast key={toast.id} id={toast.id} type={toast.type} message={toast.message} />
      ))}
    </StlyedToastContainer>
  );
};

export default ToastContainer;

const StlyedToastContainer = styled.div`
  position: fixed;
  top: 2rem;
  right: 1.5rem;
  z-index: 1000;

  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;
