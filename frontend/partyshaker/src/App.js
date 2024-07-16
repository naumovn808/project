import './App.css';
import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer'
import ProductCard from './Components/ProductCart/ProductCart';

function App() {
  return (
    <>
    <div className='app'>
      <Header />
    <div className='main-content'>
      <ProductCard />


      </div> 
      <Footer />   
      </div>
      </>
  );
}

export default App;
