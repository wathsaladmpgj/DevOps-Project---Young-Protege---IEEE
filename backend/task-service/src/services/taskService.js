const taskModel = require('../models/taskModel');

const allowedStatuses = ['pending', 'in_progress', 'completed'];

const normalizeStatus = (status) => {
  if (!status) {
    return 'pending';
  }

  const normalizedStatus = String(status).trim().toLowerCase();

  if (!allowedStatuses.includes(normalizedStatus)) {
    const error = new Error('Status must be one of pending, in_progress, or completed');
    error.statusCode = 400;
    throw error;
  }

  return normalizedStatus;
};

const ensureTaskExists = (task) => {
  if (!task) {
    const error = new Error('Task not found');
    error.statusCode = 404;
    throw error;
  }
};

const getTasksForUser = async (userId) => {
  return taskModel.getTasksByUserId(userId);
};

const createTaskForUser = async (userId, payload) => {
  if (!payload.title || !String(payload.title).trim()) {
    const error = new Error('Title is required');
    error.statusCode = 400;
    throw error;
  }

  const status = normalizeStatus(payload.status);
  const taskId = await taskModel.insertTask({
    userId,
    title: String(payload.title).trim(),
    description: payload.description ? String(payload.description).trim() : '',
    status
  });

  return taskModel.findTaskByIdAndUser(taskId, userId);
};

const updateTaskForUser = async (userId, taskId, payload) => {
  const existingTask = await taskModel.findTaskByIdAndUser(taskId, userId);
  ensureTaskExists(existingTask);

  const title = payload.title ? String(payload.title).trim() : existingTask.title;
  const description = payload.description !== undefined ? String(payload.description).trim() : existingTask.description;
  const status = normalizeStatus(payload.status || existingTask.status);

  if (!title) {
    const error = new Error('Title is required');
    error.statusCode = 400;
    throw error;
  }

  await taskModel.updateTaskByIdAndUser(taskId, userId, {
    title,
    description,
    status
  });

  return taskModel.findTaskByIdAndUser(taskId, userId);
};

const deleteTaskForUser = async (userId, taskId) => {
  const existingTask = await taskModel.findTaskByIdAndUser(taskId, userId);
  ensureTaskExists(existingTask);

  await taskModel.deleteTaskByIdAndUser(taskId, userId);

  return { deletedTaskId: Number(taskId) };
};

module.exports = {
  getTasksForUser,
  createTaskForUser,
  updateTaskForUser,
  deleteTaskForUser
};