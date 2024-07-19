import { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa';
import { styled } from 'styled-components';
import Button from './Button';

interface EllipsisBoxProps {
  children: React.ReactNode;
  linelimit: number;
}

// 텍스트가 넘칠 때 말줄임표를 표시하는 컴포넌트
const EllipsisBox = ({ children, linelimit }: EllipsisBoxProps) => {
  // expanded: 텍스트가 넘칠 때 말줄임표를 표시할지 여부를 결정하는 상태
  const [expanded, setExpanded] = useState(false);

  return (
    <StyledEllipsisBox linelimit={linelimit} $expanded={expanded}>
      <p>{children}</p>
      <div className='toggle'>
        <Button
          size={'small'}
          scheme={'normal'}
          onClick={() => {
            setExpanded(!expanded);
          }}
        >
          {expanded ? '접기' : '더보기'}
          <FaAngleDown />
        </Button>
      </div>
    </StyledEllipsisBox>
  );
};

export default EllipsisBox;

interface StyledEllipsisBoxProps {
  linelimit: number;
  $expanded: boolean;
}

const StyledEllipsisBox = styled.div<StyledEllipsisBoxProps>`
  p {
    margin: 0;
    padding: 20px 0 0 0;
    overflow: hidden;
    text-overflow: ellipsis; // 텍스트가 넘칠 때 말줄임표
    display: -webkit-box; // 브라우저 엔진
    -webkit-line-clamp: ${(props) => (props.$expanded ? 'none' : props.linelimit)}; // n줄까지 표시
    -webkit-box-orient: vertical; // 세로 방향으로 표시
  }
  .toggle {
    display: flex;
    justify-content: flex-end;
    svg {
      transform: ${(props) => (props.$expanded ? 'rotate(180deg)' : 'rotate(0)')};
      // rotate(180deg) : 아이콘을 180도 회전
    }
  }
`;
