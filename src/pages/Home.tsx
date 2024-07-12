import Title from '../components/common/Title';
import { formatNumber } from '../utils/format';

const Home = () => {
  const COUNT = 10000;
  return (
    <>
      <Title size='medium' color='background'>
        제목 텍스트
      </Title>
      <div>home body</div>
      <div>count: {formatNumber(COUNT)}</div>
    </>
  );
};

export default Home;
