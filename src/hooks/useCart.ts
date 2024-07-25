import { useEffect, useState } from 'react';
import { deleteCart, fetchCarts } from '../api/carts.api';
import { Cart } from '../models/cart.model';

export const useCart = () => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [isEmpty, setIsEmpty] = useState(true);

  const deleteCartItem = (cartId: number) => {
    deleteCart(cartId).then(() => {
      // 낙관적 업데이트
      setCarts(carts.filter((cart) => cart.cart_items_id !== cartId));
      setIsEmpty(carts.length === 0);
    });
  };

  useEffect(() => {
    fetchCarts().then((res) => {
      setCarts(res);
      setIsEmpty(res.length === 0);
    });
  }, []);

  return { carts, isEmpty, deleteCartItem };
};
