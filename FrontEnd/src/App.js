import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import NavBar from './components/Navbar/NavBar';
//import Home from './routes/Home/Home';
import Login from './components/Login/Login';
import { ItemListContainer } from './components/ItemListContainer/ItemListContainer';
import { ItemDetailContainer } from './components/ItemDetailContainer/ItemDetailContainer';
import Cart from './components/Cart/Cart'
import { Brief } from './components/Brief/Brief'
import { CartProvider } from './context/CartContext';



function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          {/* <Route exact path="/register" element={<Register />} /> */}
        </Routes>
        <NavBar>
        <Routes>
          <Route exact path="/" element={<ItemListContainer />} />
          <Route exact path="/category/:categoryid" element={<ItemListContainer />} />
          <Route exact path="/item/:id" element={<ItemDetailContainer />} />
          <Route exact path='/cart' element={<Cart />} />
          <Route exact path='/brief' element={<Brief />} />
        </Routes>
        </NavBar>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
