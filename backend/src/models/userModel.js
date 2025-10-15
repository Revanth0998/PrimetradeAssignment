const { openDb } = require('../config/db');
const bcrypt = require('bcryptjs');

const validatePassword = (password) => password.length > 4;

const getUserByUsername = async (username) => {
  const db = await openDb();
  return db.get('SELECT * FROM user WHERE username = ?', [username]);
};

const createUser = async (username, name, password, gender, location) => {
  const db = await openDb();
  const hashedPassword = await bcrypt.hash(password, 10);
  return db.run(
    `INSERT INTO user (username, name, password, gender, location) VALUES (?, ?, ?, ?, ?)`,
    [username, name, hashedPassword, gender, location]
  );
};

module.exports = { validatePassword, getUserByUsername, createUser };
