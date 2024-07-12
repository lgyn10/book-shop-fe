import Layout from './components/layout/Layout';
import Home from './pages/Home';

function App() {
  return (
    <>
      {/* <Layout children={<Home />} /> */}
      <Layout>
        <Home /> {/** children props */}
      </Layout>
    </>
  );
}

export default App;
