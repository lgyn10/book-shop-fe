/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';
import { BookStoreThemeProvider } from '../../context/themeContext';

import Button from './Button';

describe('Button 컴포넌트 테스트', () => {
  //! 1. 렌더 확인
  it('렌더를 확인', () => {
    render(
      <BookStoreThemeProvider>
        <Button size='medium' scheme='normal'>
          버튼 테스트
        </Button>
      </BookStoreThemeProvider>
    );
    expect(screen.getByText('버튼 테스트')).toBeInTheDocument();
  });
  //! 2. size props 적용
  it('size props 적용', () => {
    const { container } = render(
      <BookStoreThemeProvider>
        <Button size='medium' scheme='normal'>
          버튼 테스트
        </Button>
      </BookStoreThemeProvider>
    );
    expect(container?.firstChild).toHaveStyle('font-size: 1rem');
  });
  //! 3. scheme props 적용
  it('scheme props 적용', () => {
    const { container } = render(
      <BookStoreThemeProvider>
        <Button size='medium' scheme='normal'>
          버튼 테스트
        </Button>
      </BookStoreThemeProvider>
    );
    expect(container?.firstChild).toHaveStyle('color: black');
    expect(container?.firstChild).toHaveStyle('background-color: lightgrey');
  });
});
