import React from 'react';
import styled from 'styled-components';

// React.InputHTMLAttributes<HTMLInputElement> : input 요소에 사용할 수 있는 속성을 정의한 타입
interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  inputType?: 'text' | 'email' | 'password' | 'number';
}

// React.forwardRef는 React에서 부모 컴포넌트가
// 자식 컴포넌트의 DOM 노드나 클래스 컴포넌트의 인스턴스에 접근할 수 있게 해주는 유틸리티 함수
// 이를 통해 함수 컴포넌트에서도 ref를 전달하고 사용할 수 있다.
// 예를 들어, 부모 컴포넌트에서 InputText 컴포넌트에 ref를 전달하고 싶을 때 유용
const InputText = React.forwardRef(
  ({ placeholder, inputType, onChange, ...props }: Props, ref: React.Ref<HTMLInputElement>) => {
    return <StlyedInputText placeholder={placeholder} type={inputType} onChange={onChange} ref={ref} {...props} />;
    // {...props} : 부모 컴포넌트에서 전달받은 모든 속성을 input 요소에 전달
  }
);

export default InputText;

const StlyedInputText = styled.input`
  padding: 0.25rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  font-size: 1rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.color.text};
`;
