import { login, resetPassword, resetRequest, signup } from '@/api/auth.api';
import { useAlert } from '@/hooks/useAlert';
import { LoginProps } from '@/pages/Login';
import { SignupProps } from '@/pages/Signup';
import { useAuthStore } from '@/store/authStore';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
  // 선언
  const { showAlert } = useAlert();
  const navigate = useNavigate();

  //! 상태
  const { storeLogin, stotreLogout, isLoggedIn } = useAuthStore();

  //! 메서드
  // userLogin 함수: 로그인 요청을 보내는 함수
  const userLogin = (data: LoginProps) => {
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
  // userSignup 함수: 회원가입 요청을 보내는 함수
  const userSignup = (data: SignupProps) => {
    signup(data)
      .then((res) => {
        console.log('res: ', res);
        // alert('회원가입이 완료되었습니다.');
        navigate('/login');
      })
      .catch((error) => {
        console.log('error: ', error);
        console.log(error.response.data); // error.response.data: 서버에서 전달한 에러 메시지
        showAlert(`회원가입에 실패했습니다.`);
      });
  };
  // userResetPassword 함수: 비밀번호 초기화 시도 요청을 보내는 함수
  const userResetPassword = (data: SignupProps) => {
    resetPassword(data).then((res) => {
      console.log(res);
      showAlert('비밀번호가 초기화되었습니다.');
      navigate('/login');
    });
  };
  // userResetRequest 함수: 비밀번호 초기화 실행 요청을 보내는 함수
  const [resetRequested, setResetRequested] = useState(false);
  const userResetRequest = (data: SignupProps) => {
    resetRequest(data).then((res) => {
      console.log(res);
      setResetRequested(true);
    });
  };
  //! 리턴
  return { userLogin, userSignup, resetRequested, setResetRequested, userResetPassword, userResetRequest };
};
