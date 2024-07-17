import { FaSmile } from 'react-icons/fa';
import { styled } from 'styled-components';
import Title from '../common/Title';

const BooksEmpty = () => {
  return (
    <StyledBooksEmpty>
      <div className='icon'>
        <FaSmile />
      </div>
      <Title size={'large'} color='secondary'>
        검색결과가 없습니다.
      </Title>
    </StyledBooksEmpty>
  );
};

export default BooksEmpty;

const StyledBooksEmpty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 120px 0;

  .icon {
    svg {
      font-size: 4rem;
      fill: #ccc; // fill 속성: svg의 색상을 변경
      color: ${({ theme }) => theme.color.primary};
    }
  }
`;
