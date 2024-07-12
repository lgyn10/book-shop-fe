export type ThemeName = 'light' | 'dark';
export type ColorKey = 'primary' | 'background';
export type HeadingSize = 'small' | 'medium' | 'large';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonScheme = 'primary' | 'normal';

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
  button: {
    [key in ButtonSize]: { padding: string; fontSize: string };
  };
  buttonScheme: {
    [key in ButtonScheme]: { color: string; backgroundColor: string };
  };
  borderRadius: {
    default: string;
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
  button: {
    large: { padding: '1rem 2rem', fontSize: '1.5rem' },
    medium: { padding: '0.5rem 1rem', fontSize: '1rem' },
    small: { padding: '0.25rem 0.5rem', fontSize: '0.75rem' },
  },
  buttonScheme: {
    primary: { color: 'white', backgroundColor: 'midnightblue' },
    normal: { color: 'black', backgroundColor: 'lightgrey' },
  },
  borderRadius: {
    default: '4px',
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
