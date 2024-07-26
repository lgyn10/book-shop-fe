import axios from 'axios';
import { OrderRequest } from '../models/order.model';
import { getToken } from '../store/authStore';

export const order = async (orderData: OrderRequest) => {
  const response = await axios.post('/orders', orderData, {
    headers: {
      Authorization: getToken(),
    },
  });
  return response.data;
};
