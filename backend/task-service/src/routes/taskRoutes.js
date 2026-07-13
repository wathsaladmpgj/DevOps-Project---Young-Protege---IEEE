const router = require('express').Router();
const { body } = require('express-validator');
const taskController = require('../controllers/taskController');
const authenticateToken = require('../middleware/auth');

const taskValidators = [
  body('title')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Title cannot be empty if provided'),
  body('description').optional().trim(),
  body('status')
    .optional()
    .isIn(['pending', 'in_progress', 'completed'])
    .withMessage('Status must be pending, in_progress, or completed')
];

router.get('/tasks', authenticateToken, taskController.listTasks);
router.post(
  '/tasks',
  authenticateToken,
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').optional().trim(),
    body('status').optional().isIn(['pending', 'in_progress', 'completed']).withMessage('Invalid task status')
  ],
  taskController.createTask
);
router.put('/tasks/:id', authenticateToken, taskValidators, taskController.updateTask);
router.delete('/tasks/:id', authenticateToken, taskController.deleteTask);

module.exports = router;