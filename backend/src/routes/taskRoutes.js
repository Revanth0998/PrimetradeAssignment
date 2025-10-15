const express = require('express');
const { authenticateToken } = require('../middleware/authMiddleware');
const {
  createNewTask,
  getTasks,
  updateExistingTask,
  deleteExistingTask,
} = require('../controllers/taskController');

const router = express.Router();

router.use(authenticateToken); // All below routes protected

router.post('/', createNewTask);
router.get('/', getTasks);
router.put('/:taskId', updateExistingTask);
router.delete('/:taskId', deleteExistingTask);

module.exports = router;
