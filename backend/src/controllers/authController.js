const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { openDb } = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'my_secret_key';

// Register User
const register = async (req, res) => {
  try {
    const { username, name, password, gender, location } = req.body;

    if (!username || !password) {
      return res.status(400).send('Username and password required');
    }

    const db = await openDb();
    const existingUser = await db.get('SELECT * FROM user WHERE username = ?', [username]);

    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.run(
      'INSERT INTO user (username, name, password, gender, location) VALUES (?, ?, ?, ?, ?)',
      [username, name, hashedPassword, gender, location]
    );

    res.status(200).send('User registered successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// Login User
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const db = await openDb();

    const user = await db.get('SELECT * FROM user WHERE username = ?', [username]);
    if (!user) return res.status(400).send('Invalid user');

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).send('Invalid password');

    const payload = { id: user.id, username: user.username };
    const jwtToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.json({ jwtToken });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// Get Profile
const getProfile = async (req, res) => {
  try {
    const db = await openDb();
    const user = await db.get(
      'SELECT id, username, name, gender, location FROM user WHERE id = ?',
      [req.user.id]
    );

    if (!user) return res.status(404).send('User not found');
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

// Update Profile
const updateProfile = async (req, res) => {
  try {
    const { name, gender, location, password } = req.body;
    const db = await openDb();

    if (password && password.length > 0) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await db.run(
        'UPDATE user SET name = ?, gender = ?, location = ?, password = ? WHERE id = ?',
        [name, gender, location, hashedPassword, req.user.id]
      );
    } else {
      await db.run(
        'UPDATE user SET name = ?, gender = ?, location = ? WHERE id = ?',
        [name, gender, location, req.user.id]
      );
    }

    res.send('Profile updated successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
};

module.exports = { register, login, getProfile, updateProfile };
