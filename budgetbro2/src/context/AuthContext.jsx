import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Пока заглушка: заменим позже на реальную авторизацию
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState({
    name: 'Alice',
    avatarUrl: 'https://i.pravatar.cc/32',
  });

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Хук для удобства
export const useAuth = () => useContext(AuthContext);