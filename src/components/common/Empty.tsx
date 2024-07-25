import { styled } from 'styled-components';
import Title from './Title';

interface EmptyProps {
  icon?: React.ReactNode;
  title: string;
  description?: React.ReactNode;
}

const Empty = ({ icon, title, description }: EmptyProps) => {
  return (
    <StyledEmpty>
      {icon && <div className='icon'>{icon}</div>}
      <Title size={'large'} color='secondary'>
        {title}
      </Title>
      {description && <p>{description}</p>}
    </StyledEmpty>
  );
};

export default Empty;

const StyledEmpty = styled.div`
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
