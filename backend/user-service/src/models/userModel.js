const db = require('../config/db');

const createUser = async ({ name, email, password }) => {
  const [result] = await db.execute(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, password]
  );

  return result.insertId;
};

const findUserByEmail = async (email) => {
  const [rows] = await db.execute(
    'SELECT id, name, email, password, created_at FROM users WHERE email = ? LIMIT 1',
    [email]
  );

  return rows[0] || null;
};

const findUserById = async (id) => {
  const [rows] = await db.execute(
    'SELECT id, name, email, created_at FROM users WHERE id = ? LIMIT 1',
    [id]
  );

  return rows[0] || null;
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserById
};