import { ButtonHTMLAttributes } from 'react';
import { styled } from 'styled-components';
import { ButtonScheme, ButtonSize } from '../../style/theme';

// ButtonHTMLAttributes<HTMLButtonElement> : button 요소에 사용할 수 있는 속성을 정의한 타입
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size: ButtonSize;
  scheme: ButtonScheme;
  disabled?: boolean;
  isLoading?: boolean;
}

const Button = ({ children, size, scheme, disabled, isLoading, ...props }: Props) => {
  return (
    <StyledButton size={size} scheme={scheme} disabled={disabled} isLoading={isLoading} {...props}>
      {children}
    </StyledButton>
  );
};

export default Button;

const StyledButton = styled.button<Omit<Props, 'children'>>`
  font-size: ${({ theme, size }) => theme.button[size].fontSize};
  color: ${({ theme, scheme }) => theme.buttonScheme[scheme].color};
  padding: ${({ theme, size }) => theme.button[size].padding};
  background-color: ${({ theme, scheme }) => theme.buttonScheme[scheme].backgroundColor};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  // disabled 상태일 때 pointer-events를 none으로 설정하여 클릭 이벤트를 막는다.
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  // isLoading 상태일 때 pointer-events를 none으로 설정하여 클릭 이벤트를 막는다.
  pointer-events: ${({ isLoading }) => (isLoading ? 'none' : 'auto')};
`;
