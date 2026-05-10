import React from 'react';
import { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Login from './components/Login';
import HomePage from './components/HomePage';
import FillMemoryForm from './components/FillMemoryForm';
import Register from './components/Register';
import AlumniRegister from './components/AlumniRegister';
import ResponseSubmitted from './components/ResponseSubmitted';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/"                  element={<Login />} />
        <Route path="/home"              element={<HomePage />} />
        <Route path="/fill-memory"       element={<FillMemoryForm />} />
        <Route path="/register"          element={<Register />} />
        <Route path="/alumni-register"   element={<AlumniRegister />} />
        <Route path="/response-submitted" element={<ResponseSubmitted />} />
      </Routes>
    </Router>
  );
}

export default App;