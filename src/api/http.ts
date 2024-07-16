import axios, { AxiosRequestConfig } from 'axios';
import { getToken, removeToken } from '../store/authStore';
// AxiosRequestConfig: axios 라이브러리에서 제공하는 타입으로, HTTP 요청을 보낼 때 사용하는 설정 객체의 타입

const BASE_URL = 'http://localhost:3000';
const DEFAULT_TIMEOUT = 30000;

//! createClient 함수는 axios 인스턴스를 생성하는 함수
export const createClient = (config?: AxiosRequestConfig) => {
  // axios.create: axios 라이브러리에서 제공하는 함수로, 새로운 axios 인스턴스를 생성
  // axios 인스턴스 : axios 라이브러리에서 제공하는 HTTP 요청을 보내는 객체
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      'Content-Type': 'application/json', // JSON 형식으로 데이터를 주고받음
      Authorization: getToken() || '', // 로그인 토큰을 HTTP 요청 헤더에 포함
      // Authorization: `Bearer ${getToken() || ''}`,
      // Bearer: HTTP 요청 헤더에 토큰을 포함시킬 때 사용하는 방식
    },
    withCredentials: true, // 쿠키를 주고받을 수 있도록 설정
    ...config,
  });

  // axiosInstance.interceptors.response.use: axios 인스턴스에서 HTTP 요청을 보내고 나서 실행되는 함수
  // interceptor: axios 인스턴스에서 HTTP 요청을 보내기 전이나 후에 실행되는 함수
  // use: HTTP 요청이 성공했을 때와 실패했을 때 실행되는 함수를 등록
  axiosInstance.interceptors.response.use(
    (response) => response, // HTTP 요청이 성공했을 때 실행되는 함수
    (error) => {
      // 로그인 토큰 만료 처리
      if (error.response?.status === 401) {
        removeToken();
        window.location.href = '/login'; // 로그인 페이지로 이동
        // navigate('/login')을 사용하지 못하는 이유 : react-router-dom의 useHistory 훅을 사용하여 페이지 이동을 처리하고 있기 때문
        // react-router-dom의 useHistory 훅은 라우터 설정된 컴포넌트에서만 사용 가능
        // axios 인스턴스에서 HTTP 요청을 보내는 함수는 라우터 설정된 컴포넌트가 아니기 때문에 useHistory 훅을 사용할 수 없음
        return;
      }
      // HTTP 요청이 실패했을 때 실행되는 함수
      Promise.reject(error);
    }
  );

  // return axios 인스턴스
  return axiosInstance;
};

//! httpClient는 axios 인스턴스
// createClient 함수를 호출하여 axios 인스턴스를 생성하고, httpClient 변수에 할당
// 이렇게 생성한 axios 인스턴스는 API 요청을 보내는 데 사용
// 이렇게 axios 인스턴스를 생성하면, baseURL, timeout, headers, withCredentials 등의 설정을 공통으로 사용할 수 있음
export const httpClient = createClient();
