import ThemeSwitcher from './components/header/ThemeSwitcher';
import Layout from './components/layout/Layout';
import { BookStoreThemeProvider } from './context/themeContext';
import Home from './pages/Home';

function App() {
  return (
    <>
      <BookStoreThemeProvider>
        <Layout children={<Home />} />
        <ThemeSwitcher />
      </BookStoreThemeProvider>
    </>
  );
}

export default App;
