import axios from 'axios';

// No JWT auth anymore, so these are plain axios clients with no
// Authorization header handling.

// Talks directly to user-service (auth: register, login, profile)
export const authApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_USER_SERVICE_URL || 'http://localhost:5001'
});

// Talks directly to task-service (tasks CRUD)
export const taskApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TASK_SERVICE_URL || 'http://localhost:5002'
});
