const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
// stop issuing JWTs from the user service; token signing is disabled at the API level

const buildUserPayload = (user) => ({
  id: user.id,
  name: user.name,
  email: user.email,
  createdAt: user.created_at
});

const registerUser = async ({ name, email, password }) => {
  const existingUser = await userModel.findUserByEmail(email);

  if (existingUser) {
    const error = new Error('Email already exists');
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const userId = await userModel.createUser({
    name,
    email,
    password: hashedPassword
  });

  const createdUser = await userModel.findUserById(userId);

  return {
    user: buildUserPayload(createdUser)
  };
};

const loginUser = async ({ email, password }) => {
  const user = await userModel.findUserByEmail(email);

  if (!user) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    const error = new Error('Invalid email or password');
    error.statusCode = 401;
    throw error;
  }

  return {
    user: buildUserPayload(user)
  };
};

const getProfile = async (userId) => {
  const user = await userModel.findUserById(userId);

  if (!user) {
    const error = new Error('User not found');
    error.statusCode = 404;
    throw error;
  }

  return buildUserPayload(user);
};

module.exports = {
  registerUser,
  loginUser,
  getProfile
};