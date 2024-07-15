import { useEffect, useState } from 'react';
import { fetchCategory } from '../api/category.api';
import { Category } from '../models/category.model';

// 카테고리 정보를 가져오는 커스텀 훅
export const useCategory = () => {
  const [category, setCategory] = useState<Category[]>([]);

  useEffect(() => {
    try {
      fetchCategory().then((data) => {
        if (!data) return; // data가 없으면 return

        const categoryWithAll = [{ id: null, name: '전체' }, ...data]; // 전체 카테고리를 추가
        setCategory(categoryWithAll);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return { category }; // { category } 객체를 반환, 객체를 반환하기 위함;
};
