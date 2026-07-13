export type User = {
  id: number;
  name: string;
  email: string;
  createdAt?: string;
};

export type TaskStatus = 'pending' | 'in_progress' | 'completed';

export type Task = {
  id: number;
  user_id: number;
  title: string;
  description: string;
  status: TaskStatus;
  created_at: string;
};

export type AuthSession = {
  token: string;
  user: User;
};