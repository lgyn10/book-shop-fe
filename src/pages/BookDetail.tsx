import BookReview from '@/components/bookDetail/BookReview';
import { Tab, Tabs } from '@/components/common/Tabs';
import { Link, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import AddToCart from '../components/bookDetail/AddToCart';
import LikeButton from '../components/bookDetail/LikeButton';
import EllipsisBox from '../components/common/EllipsisBox';
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
];

const BookDetail = () => {
  const { bookId } = useParams(); // URL 파라미터에서 bookId 추출
  const { book, likeToggle, reviews, addReview } = useBook(bookId); // useBook 훅을 사용하여 book 정보 가져오기

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
          <div className='like'>
            <LikeButton book={book} onClick={likeToggle} />
          </div>
          <div className='add-cart'>
            <AddToCart book={book} />
          </div>
        </div>
      </header>
      <div className='content'>
        <Tabs>
          <Tab title='상세설명'>
            <EllipsisBox linelimit={4}>{book.detail}</EllipsisBox>
          </Tab>
          <Tab title='목차'>
            <p className='index'>{book.contents}</p>
          </Tab>
          <Tab title='리뷰'>
            <BookReview reviews={reviews} onAdd={addReview} />
          </Tab>
        </Tabs>
        {/* <Title size='medium'>상세 설명</Title>
        <EllipsisBox linelimit={4}>{book.detail}</EllipsisBox>
        <Title size={'medium'}>목차</Title>
        <p className='index'>{book.contents}</p>
        <Title size={'medium'}>리뷰</Title>
        <BookReview reviews={reviews} onAdd={addReview} /> */}
      </div>
    </StyledBookDetail>
  );
};

export default BookDetail;

const StyledBookDetail = styled.div`
  .header {
    display: flex;
    align-items: start;
    // start와 flex-start의 차이 : start는 flex-direction에 따라 달라짐, flex-start는 항상 시작점
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
  .content {
    .detail {
      // height: 200px;
      // height로 설명하면 내용이 길어지면 잘림
      /* overflow: hidden;
      text-overflow: ellipsis; // 텍스트가 넘칠 때 말줄임표
      display: -webkit-box; // 브라우저 엔진
      /-webkit-line-clamp: 4; // 4줄까지 표시
      /-webkit-box-orient: vertical; // 세로 방향으로 표시 */
    }
    .index {
      white-space: pre-wrap;
    }
  }
`;
