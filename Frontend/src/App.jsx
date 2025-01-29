import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Order from './pages/Orders';
import Account from './pages/Account';
import Cart from './pages/Cart';
import Active from './pages/Active';
import History from './pages/History';
import Track from './pages/Track';
import Custome from './pages/Custome';
import Selection from './pages/Selection';
import Personal from './pages/Personal';
import Theme from './pages/Theme';
import Design from './pages/Design';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />  
        <Route path='/order' element={<Order/>} />
        <Route path='/account' element = {<Account/>} />
        <Route path='/cart' element = {<Cart/>} />
        <Route path='/orders/active' element={<Active/>} />
        <Route path='/orders/history' element={<History/>} />
        <Route path='/orders/track' element={<Track/>} />
        <Route path='/custome' element={<Custome/>} />
        <Route path='/selection' element={<Selection/>} />
        <Route path='/personalize' element={<Personal/>} />
        <Route path='/theme' element={<Theme/>} />
        <Route path='/custome/design' element={<Design/>} />
      </Routes>
    </Router>
  );
}

export default App;
