/* eslint-disable testing-library/no-node-access */
import { render, screen } from '@testing-library/react';
import { BookStoreThemeProvider } from '../../context/themeContext';
import Title from './Title';

describe('Title 컴포넌트 테스트', () => {
  //! 1.
  it('렌더를 확인', () => {
    // 1. Title 컴포넌트를 렌더링한다.
    // 가상 DOM에 렌더링하고 실제 DOM에는 렌더링하지 않는다.
    render(
      <BookStoreThemeProvider>
        <Title size='medium' color='background'>
          제목
        </Title>
      </BookStoreThemeProvider>
    );
    // 2. Title 컴포넌트에 제목 텍스트가 있는지 확인한다.
    expect(screen.getByText('제목')).toBeInTheDocument();
  });

  //! 2.
  it('size props 적용', () => {
    // 1. Title 컴포넌트를 렌더링한다.
    // container에는 Title 컴포넌트의 렌더링 결과가 들어있다.
    const { container } = render(
      <BookStoreThemeProvider>
        <Title size='medium' color='background'>
          제목 텍스트
        </Title>
      </BookStoreThemeProvider>
    );
    // 2. Title 컴포넌트의 크기가 medium인지 확인한다.
    expect(container?.firstChild).toHaveStyle('font-size: 1.5rem');
    // toHaveStyle 함수는 첫 번째 인자로 스타일 속성을 받는다.
    // firstChild는 Title 컴포넌트를 가리킨다.
  });

  //! 3
  it('color props 적용', () => {
    // 1. Title 컴포넌트를 렌더링한다.
    // container에는 Title 컴포넌트의 렌더링 결과가 들어있다.
    const { container } = render(
      <BookStoreThemeProvider>
        <Title size='medium' color='background'>
          제목 텍스트
        </Title>
      </BookStoreThemeProvider>
    );
    // 2. Title 컴포넌트의 색상이 background인지 확인한다.
    expect(container?.firstChild).toHaveStyle('color: lightgray');
  });
});
