import { requestHandler } from '@/api/http';
import { Order, OrderDetailItem, OrderRequest } from '../models/order.model';
import { getToken } from '../store/authStore';

// export const order = async (orderData: OrderRequest) => {
//   const response = await httpClient.post('/orders', orderData, {
//     headers: {
//       Authorization: getToken(),
//     },
//   });
//   return response.data;
// };

// export const fetchOrders = async () => {
//   const response = await httpClient.get<Order[]>('/orders', {
//     headers: {
//       Authorization: getToken(),
//     },
//   });
//   return response.data;
// };

// export const fetchOrder = async (orderId: number) => {
//   const response = await httpClient.get<OrderDetailItem[]>(`/orders/${orderId}`, {
//     headers: {
//       Authorization: getToken(),
//     },
//   });
//   return response.data;
// };

const authrization = {
  headers: {
    Authorization: getToken(),
  },
};

export const order = async (orderData: OrderRequest) => {
  return requestHandler<OrderRequest>('post', '/orders', orderData, authrization);
};

export const fetchOrders = async () => {
  return requestHandler<Order[]>('get', '/orders', undefined, authrization);
};

export const fetchOrder = async (orderId: number) => {
  return requestHandler<OrderDetailItem[]>('get', `/orders/${orderId}`, undefined, authrization);
};
