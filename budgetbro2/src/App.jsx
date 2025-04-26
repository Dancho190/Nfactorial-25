import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Daily from './pages/Daily';
import Home from './pages/Home';
import Analysis from './pages/Analysis';
import Error from './pages/Error';
import SignUp from './pages/Signup';
import Login from './pages/Login';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/daily" element={<Daily />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default App;