import React from 'react';
import { useAuth } from '../context/AuthContext';
import './Header.css';

const Header = ({ toggleSidebar }) => {
    const { isAuthenticated, user , username,} = useAuth();
    const avatarUrl = user?.avatarUrl || 'https://i.pravatar.cc/32';
    return (
    <header className="header">
      <button onClick={toggleSidebar} className="sidebar-toggle-btn">☰</button>
      <h1 className="header-title">BudgetBuddy</h1>

      <div className="header-right">
        {isAuthenticated && (
          <div className="user-info">
            <span>Hi, {user.username}</span>
            <img src={avatarUrl} alt="avatar" className="avatar" />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
