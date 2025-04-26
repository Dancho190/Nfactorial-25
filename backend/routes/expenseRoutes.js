const express = require('express');
const { body } = require('express-validator');
const {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense
} = require('../controllers/ExpenseController');
const {authMiddleware} = require('../midleware/authMidleware') // Добавим мидлвейр для всех expense-роутов.


const router = express.Router();

router.use(authMiddleware);

// GET all expenses
router.get('/', getAllExpenses);

// GET one expense
router.get('/:id', getExpenseById);

// POST new expense
router.post(
  '/',
  authMiddleware,
  [
    body('amount', 'Amount is required').isNumeric(),
    body('category', 'Category is required').notEmpty(),
    body('type', 'Type must be either income or expense').isIn(['income', 'expense']),
    body('date', 'Date is required').notEmpty()
  ],
  createExpense
);

// PUT update expense
router.patch('/:id', updateExpense);

// DELETE expense
router.delete('/:id', deleteExpense);

module.exports = router;
