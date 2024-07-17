import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { fetchCategory } from '../api/category.api';
import { QUERYSTRING } from '../constants/querystring';
import { Category } from '../models/category.model';

// 카테고리 정보를 가져오는 커스텀 훅
export const useCategory = () => {
  const [category, setCategory] = useState<Category[]>([]);
  const location = useLocation();
  // useLocation 훅을 사용하여 현재 URL의 정보를 가져옴
  // location 객체에는 pathname, search, state 등의 속성이 있음

  // console.log(location); // Ex) {pathname: '/books', search: '?category_id=0', hash: '', state: null, key: '130rtaq1'}

  const setActive = () => {
    const params = new URLSearchParams(location.search); // URLSearchParams 인스턴스를 생성하고 search 속성을 전달
    if (params.has(QUERYSTRING.CATEGORY_ID)) {
      const categoryId = Number(params.get(QUERYSTRING.CATEGORY_ID)); // category_id 키의 값을 가져옴
      setCategory((prev) => {
        return prev.map((item) => ({ ...item, isActive: item.id === categoryId }));
        // 카테고리 목록을 순회하면서 category_id와 일치하는 카테고리를 활성화
      });
    } else {
      // 전체를 선택한 경우, 모든 카테고리를 비활성화
      setCategory((prev) => prev.map((item) => ({ ...item, isActive: false })));
    }
  };

  useEffect(() => {
    try {
      fetchCategory().then((data) => {
        if (!data) return; // data가 없으면 return

        const categoryWithAll = [{ id: null, name: '전체' }, ...data]; // 전체 카테고리를 추가
        setCategory(categoryWithAll);
        setActive();
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // useEffect 훅을 사용하여 location.search가 변경될 때마다 setActive 함수를 호출
  useEffect(() => {
    setActive();
  }, [location.search]);

  return { category }; // { category } 객체를 반환, 객체를 반환하기 위함;
};
