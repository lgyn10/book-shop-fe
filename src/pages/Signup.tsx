import { useState } from 'react';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import Button from '../components/common/Button';
import InputText from '../components/common/InputText';
import Title from '../components/common/Title';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 기본 이벤트를 막음
    // form 요소에서 submit 이벤트가 발생하면 새로고침이 발생하는데 이를 막기 위함
    // 새로고침이 발생하는 이유: form 요소의 submit 버튼을 누르면 form 요소의 action 속성에 정의된 URL로 이동하게 되어 있음
    console.log(email, password);
  };

  return (
    <>
      <Title size='large'>회원 가입</Title>
      <StyledSignup>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <InputText
              inputType='email'
              placeholder='이메일'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <InputText
              inputType='password'
              placeholder='비밀번호'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </fieldset>
          <fieldset>
            <Button type='submit' size={'small'} scheme={'primary'}>
              회원 가입
            </Button>
          </fieldset>
          <div className='info'>
            <Link to='/reset'>비밀번호 찾기</Link>
          </div>
        </form>
      </StyledSignup>
    </>
  );
};

export default Signup;

export const StyledSignup = styled.div`
  max-width: ${({ theme }) => theme.layout.width.small}; // theme.layout.width.small: 320px
  margin: 80px auto;

  fieldset {
    border: 0;
    padding: 0 0 8px 0;
    .error-text {
      color: red;
    }
  }

  input {
    width: 100%;
  }

  button {
    width: 100%;
  }

  .info {
    text-align: center;
    padding: 16px 0 0 0;
  }
`;
