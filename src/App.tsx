import { ThemeProvider } from 'styled-components';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import { GlobalStyle } from './style/global';
import { light } from './style/theme';

function App() {
  return (
    <>
      <ThemeProvider theme={light}>
        <GlobalStyle themeName='light' />
        <Layout children={<Home />} />
      </ThemeProvider>
    </>
  );
}

export default App;
