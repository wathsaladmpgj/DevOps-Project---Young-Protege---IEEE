import type { AuthSession, User } from './types';

const TOKEN_KEY = 'task_management_token';
const USER_KEY = 'task_management_user';

const isBrowser = () => typeof window !== 'undefined';

export const getToken = () => {
  if (!isBrowser()) {
    return '';
  }

  // JWTs are no longer included; always return empty string
  return '';
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

  // Stop storing JWT token — only persist user data for client UI state
  localStorage.removeItem(TOKEN_KEY);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearSession = () => {
  if (!isBrowser()) {
    return;
  }

  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};