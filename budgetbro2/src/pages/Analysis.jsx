import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Chart from '../components/Chart';
import './Analysis.css';
import { useAuth } from '../context/AuthContext';

const Analysis = () => {
  const { token } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expenses, setExpenses] = useState([]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/expenses', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setExpenses(data);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, [token]);

  return (
    <div className="analysis-wrapper">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="analysis-content">
        <Header toggleSidebar={toggleSidebar} />
        <div className="analysis-main-section">
          <h1>Analysis</h1>
          <div className="chart-container">
            <Chart />
          </div>

          <h2>All Transactions</h2>
          <div className="transactions-list">
            {expenses.length > 0 ? (
              <table className="transactions-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Category</th>
                    <th>Date</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.map(exp => (
                    <tr key={exp._id}>
                      <td>{exp.type}</td>
                      <td>${parseFloat(exp.amount).toFixed(2)}</td>
                      <td>{exp.category}</td>
                      <td>{new Date(exp.date).toLocaleDateString()}</td>
                      <td>{exp.description || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No transactions found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
