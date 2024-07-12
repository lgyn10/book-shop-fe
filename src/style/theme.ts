export type ThemeName = 'light' | 'dark';
export type ColorKey = 'primary' | 'background';
export type HeadingSize = 'small' | 'medium' | 'large';

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
  heading: {
    [key in HeadingSize]: { fontSize: string };
  };
}

export const light: Theme = {
  name: 'light',
  color: {
    primary: 'brown',
    background: 'lightgray',
  },
  heading: {
    large: { fontSize: '2rem' },
    medium: { fontSize: '1.5rem' },
    small: { fontSize: '1rem' },
  },
};

export const dark: Theme = {
  // light 상속받기
  ...light,
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
