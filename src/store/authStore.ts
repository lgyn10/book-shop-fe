// zustand 스토어 관리와 로그인 처리 로직을 작성

import { create } from 'zustand';

interface StoreState {
  isLoggedIn: boolean;
  storeLogin: (token: string) => void;
  stotreLogout: () => void;
}

export const getToken = () => {
  const token = localStorage.getItem('book-shop-token');
  return token;
};
export const setToken = (token: string) => {
  localStorage.setItem('book-shop-token', token);
};
export const removeToken = () => {
  localStorage.removeItem('book-shop-token');
};

export const useAuthStore = create<StoreState>((set) => ({
  isLoggedIn: getToken() ? true : false, // 로그인 상태를 저장하는 상태
  // action 함수 정의: state를 변경하는 함수
  storeLogin: (token: string) => {
    set({ isLoggedIn: true });
    setToken(token);
  },
  stotreLogout: () => {
    set({ isLoggedIn: false });
    removeToken();
  },
}));
