export type ThemeName = 'light' | 'dark';
type ColorKey = 'primary' | 'background';

interface Theme {
  name: ThemeName;
  //color: {
  // primary: string;
  // background: string;
  // secondary?: string;
  //! 1. [key: string]: string; // 어느정도 유연성을 제공
  //! 2. [key in ColorKey]: string;
  //};
  //! 3.
  color: Record<ColorKey, string>;
}

export const light: Theme = {
  name: 'light',
  color: {
    primary: 'brown',
    background: 'lightgray',
  },
};

export const dark: Theme = {
  name: 'light',
  color: {
    primary: 'coral',
    background: 'midnightblue',
  },
};

export const getTheme = (themeName: ThemeName): Theme => {
  switch (themeName) {
    case 'light':
      return light;
    case 'dark':
      return dark;
  }
};
