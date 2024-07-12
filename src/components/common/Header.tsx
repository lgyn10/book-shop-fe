import styled from 'styled-components';

const Header = () => {
  return (
    <StyledHeader>
      <h1>book store</h1>
    </StyledHeader>
  );
};

export default Header;

const StyledHeader = styled.header`
  background-color: #333;
  h1 {
    color: wheat;
  }
`;
