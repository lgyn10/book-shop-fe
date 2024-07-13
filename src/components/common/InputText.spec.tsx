import { render, screen } from '@testing-library/react';
import React from 'react';
import { BookStoreThemeProvider } from '../../context/themeContext';
import InputText from './InputText';

describe('InputText', () => {
  it('렌더를 확인', () => {
    // 1. 렌더
    render(
      <BookStoreThemeProvider>
        <InputText placeholder='여기에 입력' />
      </BookStoreThemeProvider>
    );
    // 2. 확인
    expect(screen.getByPlaceholderText('여기에 입력')).toBeInTheDocument();
  });

  // forwardRef로 ref를 전달하는 컴포넌트의 경우 ref를 테스트하기 위해
  it('forwardRef 테스트', () => {
    // 1. 렌더
    const ref = React.createRef<HTMLInputElement>();
    render(
      <BookStoreThemeProvider>
        <InputText placeholder='여기에 입력' ref={ref} />
      </BookStoreThemeProvider>
    );
    // 2. 확인
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
