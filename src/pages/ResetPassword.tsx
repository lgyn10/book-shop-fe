import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { resetPassword, resetRequest } from '../api/auth.api';
import Button from '../components/common/Button';
import InputText from '../components/common/InputText';
import Title from '../components/common/Title';
import { useAlert } from '../hooks/useAlert';

interface ResetPasswordProps {
  email: string;
  password: string;
}

const ResetPassword = () => {
  const [resetRequested, setResetRequested] = useState(false);
  const navigator = useNavigate();
  const { showAlert } = useAlert();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordProps>();

  // onSubmit 함수 : form 요소의 submit 이벤트를 처리하는 함수
  const onSubmit = (data: ResetPasswordProps) => {
    if (resetRequested) {
      // 초기화 함수 호출
      resetPassword(data).then((res) => {
        console.log(res);
        showAlert('비밀번호가 초기화되었습니다.');
        navigator('/login');
      });
    } else {
      // 요청
      resetRequest(data).then((res) => {
        console.log(res);
        setResetRequested(true);
      });
    }
  };
  return (
    <>
      <Title size='large'>비밀번호 초기화</Title>
      <StyledResetPassword>
        <form
          onSubmit={handleSubmit(onSubmit, () => {
            console.log(errors);
          })}
        >
          <fieldset>
            <InputText inputType='email' placeholder='이메일' {...register('email', { required: true })} />
          </fieldset>
          {resetRequested && (
            <fieldset>
              <InputText
                inputType='password'
                placeholder='비밀번호'
                {...register('password', { required: true, minLength: 8 })}
              />
            </fieldset>
          )}
          <fieldset>
            <Button type='submit' size={'small'} scheme={'primary'}>
              {resetRequested ? '비밀번호 초기화' : '비밀번호 초기화 요청'}
            </Button>
          </fieldset>
          <div className='info'>
            <Link to='/reset'>비밀번호 찾기</Link>
          </div>
        </form>
      </StyledResetPassword>
    </>
  );
};

export default ResetPassword;

const StyledResetPassword = styled.div`
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
