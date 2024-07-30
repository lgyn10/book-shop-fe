import { reviewsById } from '@/mock/review';
import { setupWorker } from 'msw/browser';

const handlers = [reviewsById];
// mock 서버를 사용하지 않을 때는,
// export const worker = null;
// 로 설정합니다.

export const worker = setupWorker(...handlers);
