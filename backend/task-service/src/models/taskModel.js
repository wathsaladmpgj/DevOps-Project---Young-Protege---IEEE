const db = require('../config/db');

const getTasksByUserId = async (userId) => {
  const [rows] = await db.execute(
    'SELECT id, user_id, title, description, status, created_at FROM tasks WHERE user_id = ? ORDER BY created_at DESC',
    [userId]
  );

  return rows;
};

const insertTask = async ({ userId, title, description, status }) => {
  const [result] = await db.execute(
    'INSERT INTO tasks (user_id, title, description, status) VALUES (?, ?, ?, ?)',
    [userId, title, description, status]
  );

  return result.insertId;
};

const findTaskByIdAndUser = async (taskId, userId) => {
  const [rows] = await db.execute(
    'SELECT id, user_id, title, description, status, created_at FROM tasks WHERE id = ? AND user_id = ? LIMIT 1',
    [taskId, userId]
  );

  return rows[0] || null;
};

const updateTaskByIdAndUser = async (taskId, userId, { title, description, status }) => {
  const [result] = await db.execute(
    'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ? AND user_id = ?',
    [title, description, status, taskId, userId]
  );

  return result.affectedRows;
};

const deleteTaskByIdAndUser = async (taskId, userId) => {
  const [result] = await db.execute(
    'DELETE FROM tasks WHERE id = ? AND user_id = ?',
    [taskId, userId]
  );

  return result.affectedRows;
};

module.exports = {
  getTasksByUserId,
  insertTask,
  findTaskByIdAndUser,
  updateTaskByIdAndUser,
  deleteTaskByIdAndUser
};