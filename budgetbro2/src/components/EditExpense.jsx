import { useState } from 'react';
import './AddExpenseForm.css'; // Используем те же стили
import { useAuth } from '../context/AuthContext';

const EditExpenseForm = ({ expense, onClose, onExpenseUpdated }) => { // Edit expense
  const { token } = useAuth();
  const [formData, setFormData] = useState({
    amount: expense.amount || '',
    category: expense.category || '',
    description: expense.description || '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => { // Минимальные валидаторы для amount и category
    const errs = {};
    if (!formData.amount) errs.amount = 'Required';
    if (!formData.category) errs.category = 'Required';
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/expenses/${expense._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        onExpenseUpdated(data); // обновляем в родителе
        onClose();
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error updating expense:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>Edit Expense</h2>
        <form onSubmit={handleSubmit}>
          <input
            name="amount"
            type="number"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
          />
          {errors.amount && <span className="error">{errors.amount}</span>}

          <input
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
          />
          {errors.category && <span className="error">{errors.category}</span>}

          <input
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
          />

          <button type="submit">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default EditExpenseForm;