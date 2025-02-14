import { useAuth } from '@/hooks/useAuth';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import Button from '../components/common/Button';
import InputText from '../components/common/InputText';
import Title from '../components/common/Title';

export interface SignupProps {
  email: string;
  password: string;
}

const Signup = () => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   // 기본 이벤트를 막음
  //   // form 요소에서 submit 이벤트가 발생하면 새로고침이 발생하는데 이를 막기 위함
  //   // 새로고침이 발생하는 이유: form 요소의 submit 버튼을 누르면 form 요소의 action 속성에 정의된 URL로 이동하게 되어 있음
  //   console.log(email, password);
  // };

  const { userSignup } = useAuth(); // useAuth 훅을 사용하여 userSignup 함수를 가져옴

  const {
    register, // input 요소를 등록하기 위한 함수
    handleSubmit, // form 요소의 submit 이벤트를 처리하기 위한 함수
    // 첫 번째 인자로 submit 이벤트를 처리하는 함수를 전달, 두 번째 인자로 에러 처리 함수를 전달
    formState: { errors }, // input 요소의 유효성 검사 에러를 처리하기 위한 객체
  } = useForm<SignupProps>(); // useForm 함수를 호출하여 form 요소의 상태를 관리

  // onSubmit 함수 : form 요소의 submit 이벤트를 처리하는 함수
  const onSubmit = (data: SignupProps) => {
    console.log(data);
    userSignup(data);
  };

  return (
    <>
      <Title size='large'>회원 가입</Title>
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
              회원 가입
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
