import type { AuthSession, User } from './types';

const TOKEN_KEY = 'task_management_token';
const USER_KEY = 'task_management_user';

const isBrowser = () => typeof window !== 'undefined';

export const getToken = () => {
  if (!isBrowser()) {
    return '';
  }

  return localStorage.getItem(TOKEN_KEY) || '';
};

export const getStoredUser = (): User | null => {
  if (!isBrowser()) {
    return null;
  }

  const rawUser = localStorage.getItem(USER_KEY);

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser) as User;
  } catch {
    return null;
  }
};

export const setSession = ({ token, user }: AuthSession) => {
  if (!isBrowser()) {
    return;
  }

  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearSession = () => {
  if (!isBrowser()) {
    return;
  }

  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};