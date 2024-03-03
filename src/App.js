import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Navbar from './components/Demo';
import Footer from './components/Footer';
import DropdownButton from './components/DropdownButton';
import CardHeader from 'react-bootstrap/esm/CardHeader';
import Carou1 from './components/Carou1';
import Demo from './components/Demo';
import './components/Head.css'
import Products from './components/Productpage/products';
import productdetails from './components/Productdetails/productdetails';
import { Routes,Route } from 'react-router-dom';
import Productdetails from './components/Productdetails/productdetails';
import Cart from './components/Cart/cart'; 
import { useState,useEffect } from 'react';
import axios from 'axios'

function App() {
  

  return (
<>
<Header  />

     <Routes>
              <Route path='/' element={<Carou1/>}></Route>
              <Route path='/products/:id' element={<Products />}></Route>
              <Route path='/productdetails' element={<Productdetails/>}></Route>
              <Route path='/cart' element={<Cart/>}></Route>
     </Routes>


     {/* <Demo/> */}
     {/* <Footer/> */}

     </>
     
  );
}

export default App;
