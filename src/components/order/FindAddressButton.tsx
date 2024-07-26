//! https://postcode.map.daum.net/guide
// 우변번호 서비스 활용

import { useEffect } from 'react';
import Button from '../common/Button';

interface Props {
  onCompleted: (address: string) => void;
}

// Daum   우편번호 서비스 스크립트 URL
const SCRIPT_URL = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

const FindAddressButton = ({ onCompleted }: Props) => {
  //! 스크립트 로드
  useEffect(() => {
    const script = document.createElement('script'); // script 태그 생성 <script></script>
    script.src = SCRIPT_URL; // src 속성에 스크립트 URL 설정
    script.async = true; // 비동기 방식으로 로드
    document.head.appendChild(script); // head 태그에 script 태그 추가
    // script 태그를 추가하면 해당 스크립트가 로드되어 실행됨
    // 왜 head 태그에 추가하는가?
    return () => {
      document.head.removeChild(script); // 컴포넌트가 언마운트될 때 script 태그를 제거
    };
  }, []);

  //! 핸들러
  const handleOpen = () => {
    new window.daum.Postcode({
      // window 객체에 daum.Postcode 객체를 생성
      oncomplete: (data: any) => {
        //! 입력 - 입력 작업을 위해서는 어떤 액션이 있을 떄, 부모에게 알려줘야 함
        onCompleted(data.address); // onCompleted 함수를 호출하여 주소를 전달
      },
    }).open(); // open 메서드를 호출하여 우편번호 찾기 서비스를 실행
  };

  return (
    // type에는 button, submit, reset이 있음
    <Button type='button' size={'medium'} scheme={'normal'} onClick={handleOpen}>
      주소 찾기
    </Button>
  );
};

export default FindAddressButton;
