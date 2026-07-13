const { validationResult } = require('express-validator');
const taskService = require('../services/taskService');

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
    const tasks = await taskService.getTasksForUser(req.user.id);
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

    const task = await taskService.createTaskForUser(req.user.id, req.body);
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

    const task = await taskService.updateTaskForUser(req.user.id, req.params.id, req.body);
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
    const result = await taskService.deleteTaskForUser(req.user.id, req.params.id);
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