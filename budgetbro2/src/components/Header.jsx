import React from 'react';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = ({ toggleSidebar }) => {
    const { isAuthenticated, user } = useAuth();
  return (
    <header className="header">
      <button onClick={toggleSidebar} className="sidebar-toggle-btn">☰</button>
      <h1 className="header-title">BudgetBuddy</h1>

      <div className="header-right">
        {isAuthenticated && (
          <div className="user-info">
            <span>Hi, {user.name}</span>
            <img src={user.avatarUrl} alt="avatar" className="avatar" />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
