import { createContext, useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../style/global';
import { getTheme, ThemeName } from '../style/theme';

const DEFAULT_THEME_NAME = 'light';
const THEME_LOCALSTORAGE_KEY = 'book-store-theme';

interface State {
  themeName: ThemeName;
  toggleTheme: () => void;
}

export const state = {
  themeName: DEFAULT_THEME_NAME as ThemeName,
  toggleTheme: () => {},
};

// wrapper로 감싸서 사용할 수 있는 context를 생성
export const ThemeContext = createContext<State>(state);

//! 전체 테마 Provider
// 지역 상태로 themeName, toggleTheme을 가지고 있다.
export const BookStoreThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeName, setThemeName] = useState<ThemeName>('light');
  const toggleTheme = () => {
    setThemeName(themeName === 'light' ? 'dark' : 'light');
    localStorage.setItem(THEME_LOCALSTORAGE_KEY, themeName === 'light' ? 'dark' : 'light');
  };

  // 초기 렌더링 시 localStorage에 저장된 테마를 불러옴
  useEffect(() => {
    const localTheme = localStorage.getItem(THEME_LOCALSTORAGE_KEY) as ThemeName;
    setThemeName(localTheme || DEFAULT_THEME_NAME);
  }, []);

  return (
    // ThemeContext.Provider로 감싸서 하위 컴포넌트에서 사용할 수 있도록 함
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      {/* ThemeProvider로 styled-components의 테마를 적용 */}
      <ThemeProvider theme={getTheme(themeName)}>
        <GlobalStyle themeName={themeName} />
        {/* children을 렌더링 */}
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
