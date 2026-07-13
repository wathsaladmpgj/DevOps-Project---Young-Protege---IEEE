const router = require('express').Router();
const authenticateToken = require('../middleware/auth');
const { proxyRequest } = require('../services/proxyService');

const userServiceBaseUrl = process.env.USER_SERVICE_URL || 'http://localhost:5001';

router.post('/register', async (req, res, next) => {
  try {
    await proxyRequest({
      req,
      res,
      targetUrl: `${userServiceBaseUrl}/register`
    });
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    await proxyRequest({
      req,
      res,
      targetUrl: `${userServiceBaseUrl}/login`
    });
  } catch (error) {
    next(error);
  }
});

router.get('/profile', authenticateToken, async (req, res, next) => {
  try {
    await proxyRequest({
      req,
      res,
      targetUrl: `${userServiceBaseUrl}/profile`,
      user: req.user
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;