// controllers/expenseController.js
const Expense = require('../models/Expense');

const createExpense = async (req, res) => {
  try {
    const { amount, category, type, date, description } = req.body;

    if (!amount || !category || !type || !date) {
      return res.status(400).json({ message: 'Required fields missing.' });
    }

    const expense = new Expense({
      amount,
      category,
      type,
      date,
      description,
      user: req.userId, // Заполняется через middleware (auth)
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create expense.' });
  }
};

const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.userId }).sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch expenses.' });
  }
};

const getExpenseById = async (req, res) => {
    try {
      const { id } = req.params;
  
      const expense = await Expense.findOne({ _id: id, user: req.userId });
  
      if (!expense) {
        return res.status(404).json({ message: 'Expense not found.' });
      }
  
      res.status(200).json(expense);
    } catch (err) {
      console.error('Error fetching expense by ID:', err);
      res.status(500).json({ message: 'Failed to fetch expense.' });
    }
  };

const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Expense.findOneAndUpdate(
      { _id: id, user: req.userId },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: 'Expense not found.' });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update expense.' });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Expense.findOneAndDelete({ _id: id, user: req.userId });
    if (!deleted) return res.status(404).json({ message: 'Expense not found.' });
    res.status(200).json({ message: 'Expense deleted successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete expense.' });
  }
};

exports.createExpense = createExpense
exports.getAllExpenses = getAllExpenses
exports.updateExpense = updateExpense
exports.deleteExpense = deleteExpense
exports.getExpenseById = getExpenseById