import Button from '../components/common/Button';
import InputText from '../components/common/InputText';
import Title from '../components/common/Title';
import { formatNumber } from '../utils/format';

const Home = () => {
  const COUNT = 10000;
  return (
    <>
      <Title size='medium' color='background'>
        제목 텍스트
      </Title>
      <Button size='medium' scheme='normal'>
        버튼 테스트
      </Button>
      <InputText placeholder='여기에 입력하세요.' />
      <div>home body</div>
      <div>count: {formatNumber(COUNT)}</div>
    </>
  );
};

export default Home;
