import React, { useEffect, useState } from 'react';

const Daily = () => {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]); // формат YYYY-MM-DD
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/expenses', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();

        if (res.ok) {
          setExpenses(data);
          filterByDate(data, selectedDate);
        } else {
          setError(data.message || 'Failed to fetch expenses.');
        }
      } catch (err) {
        setError('Server error.');
      }
    };

    fetchExpenses();
  }, []);

  const filterByDate = (expenses, date) => {
    const filtered = expenses.filter(exp => exp.date.startsWith(date));
    setFilteredExpenses(filtered);
  };

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setSelectedDate(newDate);
    filterByDate(expenses, newDate);
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Daily Expenses</h2>

        <input type="date" value={selectedDate} onChange={handleDateChange} />

        {error && <p className="error">{error}</p>}

        <ul>
          {filteredExpenses.length > 0 ? (
            filteredExpenses.map((expense) => (
              <li key={expense._id}>
                <strong>{expense.amount}$</strong> - {expense.category} ({expense.type})
              </li>
            ))
          ) : (
            <p>No expenses for selected date.</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Daily;
