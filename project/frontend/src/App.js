import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Title from './components/Title/Title';
import Description from './components/Description/Description';


function App() {
  return (
    <>
    <div className='app'>
      <Header />
    <div className='main-content'>
      <Title></Title>
      <Description></Description>
      </div> 
      <Footer />   
      </div>
      </>
  );
}

export default App;
