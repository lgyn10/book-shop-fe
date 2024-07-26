import { useEffect, useState } from 'react';
import { fetchOrder, fetchOrders } from '../api/order.api';
import { OrderListItem } from '../models/order.model';

export const useOrders = () => {
  const [orders, setOrders] = useState<OrderListItem[]>([]);
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  // console.log(orders);

  useEffect(() => {
    fetchOrders().then((res) => setOrders(res));
  }, []);

  const selectOrderItem = (OrderId: number) => {
    // 요청 방어 코드
    if (orders.some((item) => item.id === OrderId && item.detail)) {
      setSelectedItemId(OrderId);
      return;
    }

    // 주문 상세 정보를 가져오는 요청
    fetchOrder(OrderId).then((orderDetail) => {
      setSelectedItemId(OrderId);
      setOrders(
        orders.map((item) => {
          if (item.id === OrderId) return { ...item, detail: orderDetail };
          return item;
        })
      );
    });
  };

  return { orders, selectedItemId, selectOrderItem };
};
