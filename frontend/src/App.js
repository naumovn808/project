import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Title from './components/Title/Title';

function App() {
  return (
    <>
      <div className='app'>
        <Header />
        <div className='main-content'>
          <Title > Title  </Title>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
