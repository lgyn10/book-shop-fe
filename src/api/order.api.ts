import axios from 'axios';
import { Order, OrderDetailItem, OrderRequest } from '../models/order.model';
import { getToken } from '../store/authStore';

export const order = async (orderData: OrderRequest) => {
  const response = await axios.post('/orders', orderData, {
    headers: {
      Authorization: getToken(),
    },
  });
  return response.data;
};

export const fetchOrders = async () => {
  const response = await axios.get<Order[]>('/orders', {
    headers: {
      Authorization: getToken(),
    },
  });
  return response.data;
};

export const fetchOrder = async (orderId: number) => {
  const response = await axios.get<OrderDetailItem[]>(`/orders/${orderId}`, {
    headers: {
      Authorization: getToken(),
    },
  });
  return response.data;
};
