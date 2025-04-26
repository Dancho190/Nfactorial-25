const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


const signup = async (req, res) => { // Signup
  try {
    const { username, email, password } = req.body; // JSON body запроса

    if (!username || !email || !password) { // При ошибке выдаем error
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const existingUser = await User.findOne({ email }); // Находим юзера с таким же емейлом и выдаем ошибку
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // Хэшим пароль

    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    await newUser.save(); // Сохраняем в DB-шку
    res.status(201).json({ message: 'User created successfully.' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create user.' });
  }
};

// Логин пользователя
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: 'Email and password are required.' });

    const user = await User.findOne({ email }); // Находим юзера по емейлу
    if (!user) return res.status(401).json({ message: 'Invalid credentials.' });

    const isMatch = await bcrypt.compare(password, user.password); // Проверяем пароли на инпуте и в БД
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials.' });

    console.log('Password matched');
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' }); // JWT expiration date

    res.status(200).json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (err) {
    res.status(500).json({ message: 'Server error during login.' });
  }
};

// Логаут пользователя
const logout = (req, res) => {
  // JWT удаляется просто на фронте
  res.status(200).json({ message: 'Logout successful.' });
};

exports.signup = signup
exports.login = login
exports.logout = logout