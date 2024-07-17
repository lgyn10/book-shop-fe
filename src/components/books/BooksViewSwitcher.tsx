import { useEffect } from 'react';
import { FaList, FaTh } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { QUERYSTRING } from '../../constants/querystring';
import Button from '../common/Button';

const viewOptions = [
  {
    value: 'list',
    icon: <FaList />,
  },
  {
    value: 'grid',
    icon: <FaTh />,
  },
];

export type ViewMode = 'grid' | 'list';

const BooksViewSwitcher = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSwitch = (value: ViewMode) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(QUERYSTRING.VIEW, value);
    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    if (!searchParams.has(QUERYSTRING.VIEW)) {
      handleSwitch('grid');
    }
  }, []);

  return (
    <StyledBooksViewSwitcher>
      {viewOptions.map((option, idx) => (
        <Button
          size='medium'
          key={idx}
          scheme={searchParams.get(QUERYSTRING.VIEW) === option.value ? 'primary' : 'normal'}
          onClick={() => handleSwitch(option.value as ViewMode)}
        >
          {option.icon}
        </Button>
      ))}
    </StyledBooksViewSwitcher>
  );
};

export default BooksViewSwitcher;

const StyledBooksViewSwitcher = styled.div`
  display: flex;
  gap: 8px;
  svg {
    fill: #fff;
  }
`;
