import axios, { AxiosRequestConfig } from 'axios';
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
    },
    withCredentials: true, // 쿠키를 주고받을 수 있도록 설정
    ...config,
  });

  // axiosInstance.interceptors.request.use: axios 인스턴스에서 HTTP 요청을 보내기 전에 실행되는 함수
  axiosInstance.interceptors.response.use(
    (response) => response, // HTTP 요청이 성공했을 때 실행되는 함수
    (error) => Promise.reject(error) // HTTP 요청이 실패했을 때 실행되는 함수
  );

  // return axios 인스턴스
  return axiosInstance;
};

//! httpClient는 axios 인스턴스
// createClient 함수를 호출하여 axios 인스턴스를 생성하고, httpClient 변수에 할당
// 이렇게 생성한 axios 인스턴스는 API 요청을 보내는 데 사용
// 이렇게 axios 인스턴스를 생성하면, baseURL, timeout, headers, withCredentials 등의 설정을 공통으로 사용할 수 있음
export const httpClient = createClient();
