import styled from 'styled-components';
import Footer from '../common/Footer';
import Header from '../common/Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <StyledLayout>{children}</StyledLayout>
      <Footer />
    </>
  );
};

export default Layout;

const StyledLayout = styled.div`
  width: 100%; // 반응형을 위해 100%로 설정
  margin: 0 auto; // 가운데 정렬을 위해 margin을 auto로 설정
  max-width: ${({ theme }) => theme.layout.width.large}; // 최대 너비를 theme에서 가져옴
  padding: 20px 0;
`;
