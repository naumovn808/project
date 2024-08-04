import './App.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer'
import ProductCartOpen from './Components/ProductCardOpen/ProductCardOpen';

function App() {
  return (
    <>
    <div className='app'>
      <Header />
    <div className='main-content'>
      <ProductCartOpen />


      </div> 
      <Footer />   
      </div>
      </>
  );
}

export default App;
