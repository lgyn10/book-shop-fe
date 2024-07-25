import { Cart } from '../models/cart.model';
import { getToken } from '../store/authStore';
import { httpClient } from './http';

//! 장바구니 담기(추가)
// router.post('/', addCartItem);
//! 장바구니 도서 전체 조회 + 장바구니에서 선택한 도서 조회
//router.get('/', getCartItems);
//! 장바구니 도서 개별 삭제
//router.delete('/:cartItemId', deleteCartItem);

interface AddCartParams {
  bookId: number;
  quantity: number;
}

//- 강의에서는 hook에 try-catch문을 쓰지 않음 -> api에서 처리?

// 장바구니 도서 추가
export const addCart = async (params: AddCartParams) => {
  // 헤더에 jwt 토큰도 보냄
  const response = await httpClient.post(`/carts`, { ...params }, { headers: { Authorization: getToken() } });
  return response.data;
};

// 장바구니 아이템들 조회
export const fetchCarts = async () => {
  const response = await httpClient.get<Cart[]>(`/carts`, { headers: { Authorization: getToken() } });
  return response.data;
};

export const deleteCart = async (cartItemId: number) => {
  const response = await httpClient.delete(`/carts/${cartItemId}`, { headers: { Authorization: getToken() } });
  return response.data;
};
