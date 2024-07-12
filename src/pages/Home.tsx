import Header from '../components/common/Header';
import { formatNumber } from '../utils/format';

const Home = () => {
  const COUNT = 10000;
  return (
    <>
      <Header />
      <div>home body</div>
      <div>count: {formatNumber(COUNT)}</div>
    </>
  );
};

export default Home;
