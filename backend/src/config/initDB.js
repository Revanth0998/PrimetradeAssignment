const { openDb } = require('./db');

const initializeDatabase = async () => {
  const db = await openDb();

  await db.exec(`
    CREATE TABLE IF NOT EXISTS user(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      name TEXT,
      password TEXT,
      gender TEXT,
      location TEXT
    );
    CREATE TABLE IF NOT EXISTS task(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      title TEXT,
      description TEXT,
      status TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY(user_id) REFERENCES user(id)
    );
  `);

  console.log('Tables created or already exist');
};

module.exports = initializeDatabase;
