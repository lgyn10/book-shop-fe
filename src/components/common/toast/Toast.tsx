import { useTimeout } from '@/components/common/toast/useTimeout';
import useToastStore, { IToast } from '@/store/toastStore';
import { useState } from 'react';
import { FaBan, FaInfoCircle, FaPlus } from 'react-icons/fa';
import { styled } from 'styled-components';

//! onAnimationEnd
// onAnimationEnd는 CSS 애니메이션이 끝났을 때 실행되는 이벤트 핸들러

const Toast = ({ id, message, type }: IToast) => {
  const removeToast = useToastStore((state) => state.removeToast);
  const [isfadingOut, setIsfadingOut] = useState(false);

  const handleRevomeToast = () => {
    setIsfadingOut(true);
  };

  const handleAnimationEnd = () => {
    if (isfadingOut) {
      removeToast(id);
    }
  };

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     // 삭제
  //     handleRevomeToast();
  //   }, 3000);
  //   return () => {
  //     clearTimeout(timer);
  //   };
  // }, []);
  useTimeout(handleRevomeToast, 3000);

  return (
    <StyledToast className={isfadingOut ? 'fade-out' : 'fade-in'} onAnimationEnd={handleAnimationEnd}>
      <p>
        {type === 'info' && <FaInfoCircle />}
        {type === 'error' && <FaBan />}
        {message}
      </p>
      <button onClick={handleRevomeToast}>
        <FaPlus />
      </button>
    </StyledToast>
  );
};

export default Toast;

const StyledToast = styled.div`
  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  &.fade-in {
    animation: fade-in 0.3s ease-in-out;
  }
  &.fade-out {
    animation: fade-out 0.3s ease-in-out;
  }

  background-color: ${({ theme }) => theme.color.background};
  padding: 12px;
  border-radius: ${({ theme }) => theme.borderRadius.default};

  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 24px;

  p {
    color: ${({ theme }) => theme.color.text};
    line-height: 1;
    margin: 0;
    flex: 1;

    display: flex;
    align-items: end;
    gap: 4px;
  }

  button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    padding: 0;
    margin: 0;

    svg {
      transform: rotate(45deg);
    }
  }
`;
