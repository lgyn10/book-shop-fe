import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ThemeSwitcher from './components/header/ThemeSwitcher';
import Layout from './components/layout/Layout';
import { BookStoreThemeProvider } from './context/themeContext';
import Error from './Error';
import BookDetail from './pages/BookDetail';
import Books from './pages/Books';
import Cart from './pages/Cart';
import Home from './pages/Home';
import Login from './pages/Login';
import Order from './pages/Order';
import OrderList from './pages/OrderList';
import ResetPassword from './pages/ResetPassword';
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
        <Books />
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
  {
    path: '/reset',
    element: (
      <Layout>
        <ResetPassword />
      </Layout>
    ),
  },
  {
    path: '/login',
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
  },
  {
    path: '/book/:bookId',
    element: (
      <Layout>
        <BookDetail />
      </Layout>
    ),
  },
  {
    path: '/carts',
    element: (
      <Layout>
        <Cart />
      </Layout>
    ),
  },
  {
    path: '/order',
    element: (
      <Layout>
        <Order />
      </Layout>
    ),
  },
  {
    path: '/orderlist',
    element: (
      <Layout>
        <OrderList />
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
