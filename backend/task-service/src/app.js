const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const taskRoutes = require('./routes/taskRoutes');
const { notFound, errorHandler } = require('./middleware/errorHandler');

const app = express();

app.use(helmet());
app.use(cors({ origin: process.env.CORS_ORIGIN || 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.json({ success: true, service: 'task-service', message: 'Healthy' });
});

app.use('/', taskRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;