import React, { useState } from 'react';
import { useNavigate,Link} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { login } = useAuth(); // Сохраняем в контексте юзера
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setServerError('');

    if (!formData.email || !formData.password) {
      setErrors({ form: 'Email and password are required.' });
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', { // По auth роутам отправляем post 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // отправляем данные из форм в формате JSON
      });

      const data = await response.json();
      if (response.ok) {
        login(data.user, data.token); // вот здесь логиним пользователя через контекст
      } 

      if (response.ok) {
        localStorage.setItem('token', data.token); // Отправляем в localStorage токен
        navigate('/'); // перенаправляем после логина
      } else {
        setServerError(data.message || 'Login failed.');
      }
    } catch (err) {
      setServerError('Server error.');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
          <input name="password" type="password" placeholder="Password" value={formData.password} onChange={handleChange} />

          {errors.form && <span className="error">{errors.form}</span>}
          {serverError && <span className="error">{serverError}</span>}

          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account?{' '}
          <Link to="/signup" className="signup-link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
