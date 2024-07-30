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

// {
//   path: '/',
//   element: (
//     <Layout>
//       <Home />
//     </Layout>
//   ), // Home 컴포넌트를 렌더링, Layout 컴포넌트로 감싸기 - 공통 레이아웃 적용
//   errorElement: <Error />, // 에러 페이지 설정
//   // errorElement를 설정하지 않으면 기본 에러 페이지가 렌더링 - react-router-dom의 Route 컴포넌트의 기본 에러 페이지
// },

// createBrowserRouter 함수를 사용하여 라우터를 설정
const routeList = [
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/books',
    element: <Books />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    path: '/reset',
    element: <ResetPassword />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/book/:bookId',
    element: <BookDetail />,
  },
  {
    path: '/carts',
    element: <Cart />,
  },
  {
    path: '/order',
    element: <Order />,
  },
  {
    path: '/orderlist',
    element: <OrderList />,
  },
];

const router = createBrowserRouter(
  routeList.map((route) => {
    return {
      ...route,
      element: <Layout>{route.element}</Layout>,
      errorElement: <Error />,
    };
  })
);

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
