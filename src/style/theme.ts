export type ThemeName = 'light' | 'dark';
export type ColorKey = 'primary' | 'secondary' | 'background' | 'border' | 'text';
export type HeadingSize = 'small' | 'medium' | 'large';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonScheme = 'primary' | 'normal' | 'like';
export type LayoutWidth = 'small' | 'medium' | 'large';

export interface Theme {
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
  button: {
    [key in ButtonSize]: { padding: string; fontSize: string };
  };
  buttonScheme: {
    [key in ButtonScheme]: { color: string; backgroundColor: string };
  };
  borderRadius: {
    default: string;
  };
  layout: {
    width: { [key in LayoutWidth]: string };
  };
}

export const light: Theme = {
  name: 'light',
  color: {
    primary: '#ff5800',
    secondary: '#5f5f5f',
    background: 'lightgrey',
    border: 'darkgrey',
    text: 'black',
  },
  heading: {
    large: { fontSize: '2rem' },
    medium: { fontSize: '1.5rem' },
    small: { fontSize: '1rem' },
  },
  button: {
    large: { padding: '1rem 2rem', fontSize: '1.5rem' },
    medium: { padding: '0.5rem 1rem', fontSize: '1rem' },
    small: { padding: '0.25rem 0.5rem', fontSize: '0.75rem' },
  },
  buttonScheme: {
    primary: { color: 'white', backgroundColor: 'midnightblue' },
    normal: { color: 'black', backgroundColor: 'lightgrey' },
    like: { color: 'white', backgroundColor: 'coral' },
  },
  borderRadius: {
    default: '4px',
  },
  layout: {
    width: {
      small: '320px',
      medium: '760px',
      large: '1020px',
    },
  },
};

export const dark: Theme = {
  // light 상속받기
  ...light,
  name: 'light',
  color: {
    primary: 'coral',
    secondary: '#ff5800',
    background: 'midnightblue',
    border: 'darkgrey',
    text: 'white',
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
