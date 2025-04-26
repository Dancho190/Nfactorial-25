import { useState } from 'react';
import './AddExpenseForm.css';

const AddExpenseForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    type: 'expense',
    date: '',
    description: '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!formData.amount) errs.amount = 'Required';
    if (!formData.category) errs.category = 'Required';
    if (!formData.date) errs.date = 'Required';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // 👇 Заглушка для create запроса
    console.log('Submitted', formData);

    // Тут будет fetch POST на бэк

    onClose();
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>Add Expense</h2>
        <form onSubmit={handleSubmit}>
          <input name="amount" type="number" placeholder="Amount" value={formData.amount} onChange={handleChange} />
          {errors.amount && <span className="error">{errors.amount}</span>}

          <input name="category" placeholder="Category" value={formData.category} onChange={handleChange} />
          {errors.category && <span className="error">{errors.category}</span>}

          <select name="type" value={formData.type} onChange={handleChange}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <input name="date" type="date" value={formData.date} onChange={handleChange} />
          {errors.date && <span className="error">{errors.date}</span>}

          <input name="description" placeholder="Description" value={formData.description} onChange={handleChange} />

          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddExpenseForm;