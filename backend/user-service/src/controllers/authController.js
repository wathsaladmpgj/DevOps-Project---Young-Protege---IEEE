const { validationResult } = require('express-validator');
const userService = require('../services/userService');

// No JWT auth anymore, so there's no authenticated user on the request.
// Profile lookups fall back to this fixed default user.
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

const register = async (req, res, next) => {
  try {
    if (!handleValidation(req, res)) {
      return;
    }

    const result = await userService.registerUser(req.body);
    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    if (!handleValidation(req, res)) {
      return;
    }

    const result = await userService.loginUser(req.body);
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: result
    });
  } catch (error) {
    next(error);
  }
};

const profile = async (req, res, next) => {
  try {
    const profileData = await userService.getProfile(DEFAULT_USER_ID);
    res.status(200).json({
      success: true,
      data: profileData
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  profile
};