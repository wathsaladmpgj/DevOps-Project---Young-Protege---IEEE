const router = require('express').Router();
const authenticateToken = require('../middleware/auth');
const { proxyRequest } = require('../services/proxyService');

const taskServiceBaseUrl = process.env.TASK_SERVICE_URL || 'http://localhost:5002';

router.get('/', authenticateToken, async (req, res, next) => {
  try {
    await proxyRequest({
      req,
      res,
      targetUrl: `${taskServiceBaseUrl}/tasks`,
      user: req.user
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', authenticateToken, async (req, res, next) => {
  try {
    await proxyRequest({
      req,
      res,
      targetUrl: `${taskServiceBaseUrl}/tasks`,
      user: req.user
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:id', authenticateToken, async (req, res, next) => {
  try {
    await proxyRequest({
      req,
      res,
      targetUrl: `${taskServiceBaseUrl}/tasks/${req.params.id}`,
      user: req.user
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', authenticateToken, async (req, res, next) => {
  try {
    await proxyRequest({
      req,
      res,
      targetUrl: `${taskServiceBaseUrl}/tasks/${req.params.id}`,
      user: req.user
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;