import { FaRegUser, FaSignInAlt } from 'react-icons/fa';
import styled from 'styled-components';
import logo from '../../asset/image/logo.png';

const CATEGORY = [
  {
    id: null,
    name: '전체',
  },
  {
    id: '0',
    name: '동화',
  },
  {
    id: '1',
    name: '소설',
  },
  {
    id: '2',
    name: '사회',
  },
];

const Header = () => {
  return (
    <StyledHeader>
      <h1 className='logo'>
        <img src={logo} alt='book store' />
      </h1>
      <nav className='category'>
        <ul>
          {CATEGORY.map((item) => (
            <li key={item.id}>
              <a href={item.id === null ? `/books` : `/books?category_id=${item.id}`}>{item.name}</a>
            </li>
          ))}
        </ul>
      </nav>
      <nav className='auth'>
        <ul>
          <li>
            <a href='/login'>
              <FaSignInAlt />
              로그인
            </a>
          </li>
          <li>
            <a href='/join'>
              <FaRegUser />
              회원가입
            </a>
          </li>
        </ul>
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
      gap: 16px;
      li {
        a {
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          display: flex;
          align-items: center;
          line-height: 1;
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
