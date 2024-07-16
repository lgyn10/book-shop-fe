// 데이터를 등록하는 API

import { SignupProps } from '../pages/Signup';
import { httpClient } from './http';

export const signup = async (userData: SignupProps) => {
  // 여기에서는 try-catch문을 왜 사용하지 않을까? -> axios 인스턴스에서 에러를 처리하기 때문
  const response = await httpClient.post('/users/join', userData); // userData : 회원가입 정보 { email, password }
  return response.data;
};

export const resetRequest = async (data: SignupProps) => {
  const response = await httpClient.post('/users/reset', data);
  return response.data;
};

export const resetPassword = async (data: SignupProps) => {
  const response = await httpClient.put('/users/reset', data);
  return response.data;
};

