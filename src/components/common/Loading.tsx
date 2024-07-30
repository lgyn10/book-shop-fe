import { FaSpinner } from 'react-icons/fa';
import { styled } from 'styled-components';

const Loading = () => {
  return (
    <StyledLoading>
      <FaSpinner />
    </StyledLoading>
  );
};

export default Loading;

const StyledLoading = styled.div`
  /* @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  } */
  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
  padding: 40px 0;
  text-align: center;
  svg {
    width: 70px;
    height: 70px;
    fill: #ccc;
    animation: spin 2s linear infinite;
  }
`;
