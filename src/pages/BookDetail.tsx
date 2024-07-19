import { Link, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import Title from '../components/common/Title';
import { useBook } from '../hooks/useBook';
import { BookDetail as IBookDetail } from '../models/book.model';
import { formatDate } from '../utils/format';
import { getImgSrc } from '../utils/image';

// 구조화
const bookInfoList = [
  {
    label: '카테고리',
    key: 'category_name',
    filter: (book: IBookDetail) => <Link to={`/books?categoryId=${book.category_id}`}>{book.category_name}</Link>,
  },
  { label: '포멧', key: 'form' },
  { label: '저자', key: 'author' },
  { label: '페이지', key: 'pages' },
  { label: 'ISBN', key: 'isbn' },
  {
    label: '출간일',
    key: 'pub_date',
    // filter 함수를 사용하여 날짜를 원하는 형식으로 변환
    filter: (book: IBookDetail) => formatDate(book.pub_date),
  },
  {
    label: '가격',
    key: 'price',
    // filter 함수를 사용하여 가격을 3자리마다 콤마(,)를 찍어서 반환
    filter: (book: IBookDetail) => {
      return `${book.price.toLocaleString()}원`;
    },
  },
  { label: '요약', key: 'summary' },
];

const BookDetail = () => {
  const { bookId } = useParams(); // URL 파라미터에서 bookId 추출
  const { book } = useBook(bookId); // useBook 훅을 사용하여 book 정보 가져오기

  // console.log('book:', book);
  //! Early return: book이 없으면 null 반환
  if (!book) return null;
  // console.log(book.title);

  return (
    <StyledBookDetail>
      <Title size={'large'}>도서 상세</Title>
      <header className='header'>
        <div className='img'>
          <img src={getImgSrc(book.img)} alt={book.title} />
        </div>
        <div className='info'>
          <Title size='large' color='text'>
            {book.title}
          </Title>
          {bookInfoList.map((item) => (
            // dl: 설명 목록
            <dl key={item.key}>
              <dt>{item.label}</dt>
              <dd>{item.filter ? item.filter(book) : book[item.key as keyof IBookDetail]}</dd>
            </dl>
          ))}
          <p className='summary'>{book.summary}</p>
          <div className='like'>라이크</div>
          <div className='add-cart'>장바구니 넣기</div>
        </div>
      </header>
      <div className='content'></div>
      {bookId}
    </StyledBookDetail>
  );
};

export default BookDetail;

const StyledBookDetail = styled.div`
  .header {
    display: flex;
    align-items: center;
    gap: 1.5rem;
    padding: 0 0 1.5rem 0;

    .img {
      flex: 1;
      img {
        width: 100%;
        height: auto;
      }
    }

    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;

      dl {
        display: flex;
        margin: 0;
        dt {
          width: 100px;
          color: ${({ theme }) => theme.color.secondary};
        }
        a {
          color: ${({ theme }) => theme.color.primary};
        }
      }
    }
  }
`;
