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

// 장바구니 도서 추가
export const addCart = async (params: AddCartParams) => {
  try {
    // 헤더에 jwt 토큰도 보냄
    const response = await httpClient.post(`/carts`, { ...params }, { headers: { Authorization: getToken() } });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
