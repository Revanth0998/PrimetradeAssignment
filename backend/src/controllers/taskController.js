const {
  createTask,
  getTasksByUser,
  getTaskById,
  updateTask,
  deleteTask,
} = require('../models/taskModel');

const createNewTask = async (req, res) => {
  try {
    const { title, description, status } = req.body;
    await createTask(req.user.id, title, description, status);
    res.send('Task created');
  } catch {
    res.status(500).send('Server Error');
  }
};

const getTasks = async (req, res) => {
  try {
    const tasks = await getTasksByUser(req.user.id);
    res.json(tasks);
  } catch {
    res.status(500).send('Server Error');
  }
};

const updateExistingTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, status } = req.body;
    const task = await getTaskById(taskId, req.user.id);
    if (!task) return res.status(404).send('Task not found');

    await updateTask(taskId, req.user.id, title, description, status);
    res.send('Task updated');
  } catch {
    res.status(500).send('Server Error');
  }
};

const deleteExistingTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await getTaskById(taskId, req.user.id);
    if (!task) return res.status(404).send('Task not found');

    await deleteTask(taskId, req.user.id);
    res.send('Task deleted');
  } catch {
    res.status(500).send('Server Error');
  }
};

module.exports = {
  createNewTask,
  getTasks,
  updateExistingTask,
  deleteExistingTask,
};
