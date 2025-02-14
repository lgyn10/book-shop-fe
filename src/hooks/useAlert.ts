import { useCallback } from 'react';

export const useAlert = () => {
  // useCallback: 함수를 캐싱하는 훅
  // 래핑을 통해 함수를 캐싱하면 함수가 변경되지 않아서 불필요한 리렌더링을 방지할 수 있음
  const showAlert = useCallback((message: string) => {
    alert(message);
  }, []); // 빈 배열을 전달하여 함수를 캐싱

  // confirm 창을 띄우는 함수
  const showConfirm = useCallback((message: string, onConfirm: () => void) => {
    if (window.confirm(message)) {
      onConfirm();
    }
  }, []); // 빈 배열을 전달하여 함수를 캐싱

  return { showAlert, showConfirm };
};
