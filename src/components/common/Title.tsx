import { styled } from 'styled-components';
import { ColorKey, HeadingSize } from '../../style/theme';

interface Props {
  children: React.ReactNode;
  size: HeadingSize;
  color?: ColorKey;
}

const Title = ({ children, size, color }: Props) => {
  return (
    <StyledTitle size={size} color={color}>
      {children}
    </StyledTitle>
  );
};

export default Title;

//  Omit<Props, 'children'>은 Props 타입에서 children 프로퍼티를 제외한 타입을 만든다.
// 따라서 StyledTitle 컴포넌트는 size와 color만을 받아들이게 된다.
const StyledTitle = styled.h1<Omit<Props, 'children'>>`
  font-size: ${({ theme, size }) => theme.heading[size].fontSize};
  color: ${({ theme, color }) => theme.color[color ?? 'primary']};
`;
