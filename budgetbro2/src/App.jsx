import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import viteLogo from '/vite.svg'
import Daily from './pages/Daily';
import Home from './pages/Home';
import Analysis from './pages/Analysis';
import Error from './pages/Error';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/daily" element={<Daily />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default App;