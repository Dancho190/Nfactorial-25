import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Daily from './pages/Daily';
import Home from './pages/Home';
import Analysis from './pages/Analysis';
import Error from './pages/Error';
import SignUp from './pages/Signup';
import Login from './pages/Login';

// Функция для проверки наличия и валидности токена JWT
const isAuthenticated = () => {
  const token = localStorage.getItem('token'); // или sessionStorage в зависимости от предпочтений
  return token && !isTokenExpired(token);
};

// Функция для проверки срока действия токена
const isTokenExpired = (token) => {
  try {
    const decoded = JSON.parse(atob(token.split('.')[1])); // Декодируем токен (в формате JWT)
    const expiry = decoded.exp; // Период действия токена
    return expiry * 1000 < Date.now(); // Проверяем, не истек ли срок действия
  } catch (e) {
    return true;
  }
};

// Защищенный маршрут
const ProtectedRoute = ({ element, ...props }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        
        {/* Защищенные маршруты */}
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
        <Route path="/daily" element={<ProtectedRoute element={<Daily />} />} />
        <Route path="/analysis" element={<ProtectedRoute element={<Analysis />} />} />
        
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default App;
