import { useSearchParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { LIMIT } from '../../constants/pagination';
import { QUERYSTRING } from '../../constants/querystring';
import { Pagination as IPagenation } from '../../models/pagination.model';
import Button from '../common/Button';

interface Props {
  pagination: IPagenation;
}

const Pagination = ({ pagination }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const { totalCount, currentPage } = pagination;
  const pages: number = Math.ceil(totalCount / LIMIT);

  const handleClickPage = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(QUERYSTRING.PAGE, page.toString()); // 페이지 번호를 쿼리 스트링에 추가
    setSearchParams(newSearchParams); // URL을 업데이트
    // 페이지 번호를 클릭하면 URL이 업데이트되고 useBooks 훅이 호출되어 책 목록이 업데이트됨
  };
  return (
    <StyledPagiantion>
      {pages > 0 && (
        <ol>
          {Array(pages)
            .fill(0)
            .map((_, idx) => (
              <li key={idx}>
                <Button
                  size={'small'}
                  scheme={idx + 1 === currentPage ? 'primary' : 'normal'}
                  onClick={() => handleClickPage(idx + 1)}
                >
                  {idx + 1}
                </Button>
              </li>
            ))}
        </ol>
      )}
    </StyledPagiantion>
  );
};

export default Pagination;

const StyledPagiantion = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 24px 0;
  ol {
    list-style: none;
    display: flex;
    gap: 8px;
    padding: 0;
    margin: 0;
  }
`;
