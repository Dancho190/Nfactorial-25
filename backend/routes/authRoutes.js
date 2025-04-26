const express = require('express');
const { body } = require('express-validator');
const { login, logout, signup } = require('../controllers/authController');

const router = express.Router();

router.post('/signup', 
    [
    body('email').isEmail().withMessage('Enter a valid email.'),
    body('password').isLength({ min: 3 }).withMessage('Password must be at least 3 characters.')
   ],
    signup
  );

router.post(
  '/login',
  [
    body('email', 'Valid email is required').isEmail(),
    body('password', 'Password is required').notEmpty()
  ],
  login
);

router.post('/logout', logout);

module.exports = router;
