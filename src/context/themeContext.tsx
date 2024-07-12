import { createContext, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from '../style/global';
import { getTheme, ThemeName } from '../style/theme';

interface State {
  themeName: ThemeName;
  toggleTheme: () => void;
}

export const state = {
  themeName: 'light' as ThemeName,
  toggleTheme: () => {},
};

export const ThemeContext = createContext<State>(state);

//! 전체 테마 Provider
// 지역 상태로 themeName, toggleTheme을 가지고 있다.
export const BookStoreThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeName, setThemeName] = useState<ThemeName>('light');
  const toggleTheme = () => {
    setThemeName(themeName === 'light' ? 'dark' : 'light');
  };
  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={getTheme(themeName)}>
        <GlobalStyle themeName={themeName} />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
