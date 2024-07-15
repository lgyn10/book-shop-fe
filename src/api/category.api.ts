// http 클라이언트를 사용하는 category.api.ts 파일

import { Category } from '../models/category.model';
import { httpClient } from './http';

export const fetchCategory = async () => {
  // <Category> : fetchCategory 함수가 Category 타입의 객체를 반환한다는 것을 명시
  const response = await httpClient.get<Category[]>('/category');
  return response.data;
};
