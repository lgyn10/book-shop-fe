import React from 'react';
import styled from 'styled-components';

interface Props {
  placeholder: string;
}

// React.forwardRef는 React에서 부모 컴포넌트가
// 자식 컴포넌트의 DOM 노드나 클래스 컴포넌트의 인스턴스에 접근할 수 있게 해주는 유틸리티 함수
// 이를 통해 함수 컴포넌트에서도 ref를 전달하고 사용할 수 있다.
// 예를 들어, 부모 컴포넌트에서 InputText 컴포넌트에 ref를 전달하고 싶을 때 유용
const InputText = React.forwardRef(({ placeholder }: Props, ref: React.Ref<HTMLInputElement>) => {
  return <StlyedInputText type='text' placeholder={placeholder} ref={ref} />;
});

export default InputText;

const StlyedInputText = styled.input.attrs({ type: 'text' })`
  padding: 0.25rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  font-size: 1rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.color.text};
`;
