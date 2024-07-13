import styled from 'styled-components';
import logo from '../../asset/image/logo.png';

const Footer = () => {
  return (
    <>
      <StyledFooter>
        <h1 className='logo'>
          <img src={logo} alt='book store' />
        </h1>
        <div className='copyright'>
          <p>copyright(c) 2024, Book Store</p>
        </div>
      </StyledFooter>
    </>
  );
};

export default Footer;

const StyledFooter = styled.footer`
  width: 100%; // 반응형을 위해 100%로 설정
  margin: 0 auto; // 가운데 정렬을 위해 margin을 auto로 설정
  max-width: ${({ theme }) => theme.layout.width.large}; // 최대 너비를 theme에서 가져옴
  border-top: 1px solid ${({ theme }) => theme.color.background};
  padding: 20px 0;

  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo {
    img {
      width: 140px;
    }
  }
  .copyright {
    p {
      font-size: 0.75rem;
      color: ${({ theme }) => theme.color.text};
    }
  }
`;
