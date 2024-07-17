import { useSearchParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { useCategory } from '../../hooks/useCategory';
import Button from '../common/Button';

// 상태
// 1. 카테고리 선택
// 2. 신간 여부 선택
// 3. 정렬 방식 선택
// -> 쿼리 스트링을 이용하는 방식이 더 유용할 수 있음

// 쿼리 스트링을 이용하는 방법이 가지는 장점
// 상태공유, 재사용, 검색엔진 최적화
// 쿼리 스트링을 이용하면 URL을 통해 상태를 공유할 수 있음

const BooksFilter = () => {
  const { category } = useCategory();

  // URL의 쿼리 스트링을 가져오는 useSearchParams 훅
  // seachParams: URLSearchParams 인스턴스
  // setSearchParams: URLSearchParams 인스턴스를 업데이트하는 함수
  const [searchParams, setSearchParams] = useSearchParams();

  const handleCategory = (id: number | null) => {
    // URLSearchParams: URL의 쿼리 스트링을 다루는 객체
    // URLSearchParams 인스턴스를 생성하고 searchParams를 전달
    const newSearchParams = new URLSearchParams(searchParams);
    console.log('newSearchParams: ', newSearchParams);
    // id가 null이면 'category' 키를 삭제
    if (id === null) {
      newSearchParams.delete('category_id');
    } else {
      // id가 null이 아니면 'category' 키를 추가
      newSearchParams.set('category_id', id.toString());
    }
    // setSearchParams 함수를 호출하여 URL을 업데이트
    setSearchParams(newSearchParams);
  };

  return (
    <StyledBooksFilter>
      <div className='category'>
        {category.map((item) => (
          <Button
            size='medium'
            key={item.id}
            scheme={'normal'}
            onClick={() => {
              handleCategory(item.id);
            }}
          >
            {item.name}
          </Button>
        ))}
      </div>
      <div className='new'>
        <Button size='medium' scheme={'normal'}>
          신간
        </Button>
      </div>
    </StyledBooksFilter>
  );
};

export default BooksFilter;

const StyledBooksFilter = styled.div`
  display: flex;
  gap: 24px;

  .category {
    display: flex;
    gap: 8px;
  }
`;
