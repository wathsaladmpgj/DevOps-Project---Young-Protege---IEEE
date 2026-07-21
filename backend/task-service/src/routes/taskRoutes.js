const router = require('express').Router();
const { body } = require('express-validator');
const taskController = require('../controllers/taskController');

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

router.get('/tasks', taskController.listTasks);
router.post(
  '/tasks',
  [
    body('title').trim().notEmpty().withMessage('Title is required'),
    body('description').optional().trim(),
    body('status').optional().isIn(['pending', 'in_progress', 'completed']).withMessage('Invalid task status')
  ],
  taskController.createTask
);
router.put('/tasks/:id', taskValidators, taskController.updateTask);
router.delete('/tasks/:id', taskController.deleteTask);

module.exports = router;
