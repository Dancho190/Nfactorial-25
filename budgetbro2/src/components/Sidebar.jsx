import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaCalendarDay, FaChartPie, FaTimes, FaPlus, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';



const Sidebar = ({ isOpen, toggleSidebar, showModal}) => {
    const { isAuthenticated, user, logout  } = useAuth();
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <h2 className="logo">💰 BudgetBuddy</h2>
        <button className="close-btn" onClick={toggleSidebar}>
          <FaTimes />
        </button>
      </div>

      <nav>
        <NavLink to="/" className="nav-link">
          <FaHome /> Home
        </NavLink>
        <NavLink to="/daily" className="nav-link">
          <FaCalendarDay /> Daily
        </NavLink>
        <NavLink to="/analysis" className="nav-link">
          <FaChartPie /> Analysis
        </NavLink>
      </nav>

      {isAuthenticated && (
        <>
          <button className="add-expense-btn"  onClick={showModal}>
            <FaPlus /> Add Expense
          </button>

          <button className="logout-btn" onClick={logout}>
            <FaSignOutAlt /> Logout
          </button>
        </>
      )}
    </div>
  );
};

export default Sidebar;