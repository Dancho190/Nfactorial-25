import React from 'react';
import { FaMoneyBillAlt } from 'react-icons/fa';
import './ExpenseCard.css';

const ExpenseCard = ({ expense, onDelete, onEdit }) => {
    if (!expense) return null;
    
  return (
    <div className="expense-card">
      <div className="card-header">
        <FaMoneyBillAlt className="expense-icon" />
        <div>
          <h4>{expense.category}</h4>
          <p className="expense-date">{new Date(expense.date).toLocaleDateString()}</p>
        </div>
      </div>
      <p className="expense-desc">{expense.description}</p>
      <p className="expense-amount">${expense.amount}</p>
      <div className="card-buttons">
        <button className="btn update" onClick={() => onEdit(expense)}>Update</button>
        <button className="btn delete" onClick={() => onDelete(expense.id)}>Delete</button>
      </div>
    </div>
  );
};

export default ExpenseCard;
