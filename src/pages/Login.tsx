import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { login } from '../api/auth.api';
import Button from '../components/common/Button';
import InputText from '../components/common/InputText';
import Title from '../components/common/Title';
import { useAlert } from '../hooks/useAlert';
import { useAuthStore } from '../store/authStore';

export interface SignupProps {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const showAlert = useAlert();

  const { isLoggedIn, storeLogin, stotreLogout } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupProps>();

  const onSubmit = (data: SignupProps) => {
    console.log(data);
    login(data)
      .then((res) => {
        console.log('res: ', res);
        // 상태 변화
        storeLogin(res.token);
        showAlert('로그인이 완료되었습니다.');
        navigate('/');
      })
      // 에러 처리: 서버에서 전달한 에러 메시지를 출력
      .catch((err) => {
        console.log('err: ', err);
        showAlert('로그인에 실패했습니다.');
      });
  };

  return (
    <>
      <Title size='large'>로그인</Title>
      <StyledSignup>
        <form
          onSubmit={handleSubmit(onSubmit, () => {
            console.log(errors);
          })}
        >
          <fieldset>
            <InputText inputType='email' placeholder='이메일' {...register('email', { required: true })} />
          </fieldset>

          <fieldset>
            <InputText
              inputType='password'
              placeholder='비밀번호'
              {...register('password', { required: true, minLength: 8 })}
            />
            {errors.email && <p className='error-text'>이메일을 입력해주세요.</p>}
            {(errors.password && errors.password.type === 'required' && (
              <p className='error-text'>비밀번호를 입력해주세요.</p>
            )) ||
              (errors.password && errors.password.type === 'minLength' && (
                <p className='error-text'>비밀번호는 8자 이상 입력해주세요.</p>
              ))}
          </fieldset>
          <fieldset>
            <Button type='submit' size={'small'} scheme={'primary'}>
              로그인
            </Button>
          </fieldset>
          <div className='info'>
            <Link to='/reset'>비밀번호 초기화</Link>
          </div>
        </form>
      </StyledSignup>
    </>
  );
};

export default Login;

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
