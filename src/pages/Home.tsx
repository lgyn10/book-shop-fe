import { formatNumber } from '../utils/format';

const Home = () => {
  const COUNT = 10000;
  return (
    <>
      <div>home body</div>
      <div>count: {formatNumber(COUNT)}</div>
    </>
  );
};

export default Home;
