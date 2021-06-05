import Footer from './components/Footer';
import Header from './components/Header';
import Layout from './components/Layout';

import imgBg2 from './Assets/bg2.jpg'
import imgBg3 from './Assets/bg3.jpg'

import './App.css';

function App() {
  return (
    <>
      <Header
        title={'This is title'}
        desc={'This is Description!'}
      />
      <Layout
        urlBg={imgBg2}
      />
      <Layout 
        clrBg='blue'
      />
      <Layout
        urlBg={imgBg3}
      />
      <Footer />
    </>
  );
}

export default App;
