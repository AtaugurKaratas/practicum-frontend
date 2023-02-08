import React from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import CustomerLoginPage from './pages/CustomerLoginPage';
import CustomerRegisterPage from './pages/CustomerRegisterPage';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<CustomerRegisterPage />} />
          <Route path='/register' element={<CustomerRegisterPage />} />
          <Route path='/login' element={<CustomerLoginPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  )
}

export default App;
