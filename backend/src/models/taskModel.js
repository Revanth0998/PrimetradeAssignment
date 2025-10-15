const { openDb } = require('../config/db');

const createTask = async (userId, title, description, status) => {
  const db = await openDb();
  return db.run(
    `INSERT INTO task (user_id, title, description, status) VALUES (?, ?, ?, ?)`,
    [userId, title, description, status]
  );
};

const getTasksByUser = async (userId) => {
  const db = await openDb();
  return db.all(`SELECT * FROM task WHERE user_id = ? ORDER BY created_at DESC`, [userId]);
};

const getTaskById = async (taskId, userId) => {
  const db = await openDb();
  return db.get(`SELECT * FROM task WHERE id = ? AND user_id = ?`, [taskId, userId]);
};

const updateTask = async (taskId, userId, title, description, status) => {
  const db = await openDb();
  return db.run(
    `UPDATE task SET title = ?, description = ?, status = ? WHERE id = ? AND user_id = ?`,
    [title, description, status, taskId, userId]
  );
};

const deleteTask = async (taskId, userId) => {
  const db = await openDb();
  return db.run(`DELETE FROM task WHERE id = ? AND user_id = ?`, [taskId, userId]);
};

module.exports = { createTask, getTasksByUser, getTaskById, updateTask, deleteTask };
