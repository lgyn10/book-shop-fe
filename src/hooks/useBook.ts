import { useEffect, useState } from 'react';
import { fetchBook, likeBook, unlikeBook } from '../api/books.api';
import { addCart } from '../api/carts.api';
import { BookDetail } from '../models/book.model';
import { useAuthStore } from '../store/authStore';
import { useAlert } from './useAlert';

// 파라미터로 전달받은 bookId에 해당하는 책 정보를 가져오는 useBook 훅을 구현
export const useBook = (bookId: string | undefined) => {
  const [book, setBook] = useState<BookDetail | null>(null);
  const { isLoggedIn } = useAuthStore();
  const { showAlert } = useAlert();
  const [cartAdded, setCartAdded] = useState(false);

  useEffect(() => {
    // bookId가 없으면 함수를 종료
    if (!bookId) return;

    fetchBook(bookId).then((book) => {
      setBook(book ?? null);
    });
  }, [bookId]);

  //! 좋아요 토글
  const likeToggle = () => {
    // 권한 확인 후, 로그인이 되어 있지 않으면 함수를 종료
    if (!isLoggedIn) {
      showAlert('로그인이 필요한 서비스입니다.');
      return;
    }

    // book이 없으면 함수를 종료
    if (!book) return;

    if (book.liked) {
      // 라이크 상태 -> 라이크 취소
      unlikeBook(book.id).then(() => {
        // 성공 시, 낙관적 업데이트
        // book은 따로 fetch하지 않고, liked와 likes만 업데이트
        setBook({ ...book, liked: false, likes: book.likes - 1 });
      });
    } else {
      // 언라이크 상태 -> 라이크
      likeBook(book.id).then(() => {
        setBook({ ...book, liked: true, likes: book.likes + 1 });
      });
    }
  };

  //! 장바구니 담기
  const addToCart = (quantity: number) => {
    if (!book) return;

    if (isLoggedIn === false) {
      showAlert('로그인이 필요한 서비스입니다.');
      return;
    }
    addCart({ bookId: book.id, quantity }).then((res) => {
      // showAlert('장바구니에 추가했습니다.');
      setCartAdded(true);
      setTimeout(() => {
        setCartAdded(false);
      }, 3000);
    });
  };

  return { book, likeToggle, addToCart, cartAdded };
};
