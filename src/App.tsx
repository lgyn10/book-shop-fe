import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ThemeSwitcher from './components/header/ThemeSwitcher';
import Layout from './components/layout/Layout';
import { BookStoreThemeProvider } from './context/themeContext';
import Error from './Error';
import Home from './pages/Home';
import Signup from './pages/Signup';

// createBrowserRouter 함수를 사용하여 라우터를 설정
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <Home />
      </Layout>
    ), // Home 컴포넌트를 렌더링, Layout 컴포넌트로 감싸기 - 공통 레이아웃 적용
    errorElement: <Error />, // 에러 페이지 설정
    // errorElement를 설정하지 않으면 기본 에러 페이지가 렌더링 - react-router-dom의 Route 컴포넌트의 기본 에러 페이지
  },
  {
    path: '/books',
    element: (
      <Layout>
        <div>도서 목록</div>
      </Layout>
    ),
  },

  {
    path: '/signup',
    element: (
      <Layout>
        <Signup />
      </Layout>
    ),
  },
]);

function App() {
  return (
    <>
      <BookStoreThemeProvider>
        <RouterProvider router={router} /> {/* 라우터 설정 */}
        <ThemeSwitcher />
      </BookStoreThemeProvider>
    </>
  );
}

export default App;
