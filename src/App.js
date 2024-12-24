import './App.css';
import Header from './components/header/Header';
import Navbar from './components/navbar/Navbar';
import Home from './components/Home';
import Products from './components/products/Products';
import AboutUs from './components/extra/AboutUs';
import ContactUs from './components/extra/ContactUs';
import OrderRequest from './components/extra/OrderRequest';
import SpecialOffer from './components/extra/SpecialOffer';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Header />
        <Navbar />


        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/products' element={<Products/>}></Route>
          <Route path='order-request' element={<OrderRequest/>} ></Route>
          <Route path='special-offer' element={<SpecialOffer/>}></Route>
          <Route path='contact-us' element={<ContactUs/>}></Route>
          <Route path='about-us' element={<AboutUs/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
