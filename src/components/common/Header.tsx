import DropDown from '@/components/common/DropDown';
import { FaRegUser, FaSignInAlt, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../asset/image/logo.png';
import { useCategory } from '../../hooks/useCategory';
import { useAuthStore } from '../../store/authStore';

// const CATEGORY = [{ id: null, name: '전체' }, { id: '0', name: '동화' }, { id: '1', name: '소설' }, { id: '2', name: '사회' }];

const Header = () => {
  const { category } = useCategory(); // 커스텀 훅으로 카테고리 정보를 가져옴
  const { isLoggedIn, storeLogin, stotreLogout } = useAuthStore();

  return (
    <StyledHeader>
      <h1 className='logo'>
        <Link to='/'>
          <img src={logo} alt='book store' />
        </Link>
      </h1>
      <nav className='category'>
        <ul>
          {category.map((item) => (
            <li key={item.id}>
              <Link to={item.id === null ? `/books` : `/books?category_id=${item.id}`}>{item.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <nav className='auth'>
        <DropDown toggleButton={<FaUserCircle />}>
          <>
            {isLoggedIn && (
              <ul>
                <Link to={'/carts'}>장바구니</Link>
                <Link to={'/orderlist'}>주문내역</Link>
                <li>
                  <button onClick={stotreLogout}>로그아웃</button>
                </li>
              </ul>
            )}
            {!isLoggedIn && (
              <ul>
                <li>
                  <Link to='/login'>
                    <FaSignInAlt />
                    로그인
                  </Link>
                </li>
                <li>
                  <Link to='/signup'>
                    <FaRegUser />
                    회원가입
                  </Link>
                </li>
              </ul>
            )}
          </>
        </DropDown>
      </nav>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  width: 100%; // 반응형을 위해 100%로 설정
  margin: 0 auto; // 가운데 정렬을 위해 margin을 auto로 설정
  max-width: ${({ theme }) => theme.layout.width.large}; // 최대 너비를 theme에서 가져옴

  // flex를 사용하여 자식 요소를 가로로 정렬
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.background};

  .logo {
    img {
      width: 200px;
    }
  }
  .category {
    ul {
      display: flex;
      gap: 32px;
      li {
        a {
          font-size: 1.5rem;
          font-weight: 600;
          text-decoration: none;
          color: ${({ theme }) => theme.color.text};
          &:hover {
            color: ${({ theme }) => theme.color.primary};
          }
        }
      }
    }
  }
  .auth {
    ul {
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 100px;
      li {
        a,
        button {
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          line-height: 1;
          background-color: transparent;
          border: 0;
          svg {
            margin-right: 6px;
          }
          /* color: ${({ theme }) => theme.color.text};
          &:hover {
            color: ${({ theme }) => theme.color.primary};
          } */
        }
      }
    }
  }
`;
