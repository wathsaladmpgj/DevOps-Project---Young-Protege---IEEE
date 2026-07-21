const { validationResult } = require('express-validator');
const taskService = require('../services/taskService');

// No JWT auth anymore, so there's no authenticated user on the request.
// Tasks are scoped to this fixed default user.
const DEFAULT_USER_ID = 1;

const handleValidation = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
    return false;
  }

  return true;
};

const listTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getTasksForUser(DEFAULT_USER_ID);
    res.status(200).json({
      success: true,
      data: tasks
    });
  } catch (error) {
    next(error);
  }
};

const createTask = async (req, res, next) => {
  try {
    if (!handleValidation(req, res)) {
      return;
    }

    const task = await taskService.createTaskForUser(DEFAULT_USER_ID, req.body);
    res.status(201).json({
      success: true,
      message: 'Task created successfully',
      data: task
    });
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    if (!handleValidation(req, res)) {
      return;
    }

    const task = await taskService.updateTaskForUser(DEFAULT_USER_ID, req.params.id, req.body);
    res.status(200).json({
      success: true,
      message: 'Task updated successfully',
      data: task
    });
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const result = await taskService.deleteTaskForUser(DEFAULT_USER_ID, req.params.id);
    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  listTasks,
  createTask,
  updateTask,
  deleteTask
};