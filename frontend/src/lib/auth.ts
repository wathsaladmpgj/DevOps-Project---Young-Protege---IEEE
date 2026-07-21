import type { AuthSession, User } from './types';

const USER_KEY = 'task_management_user';

const isBrowser = () => typeof window !== 'undefined';

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

export const setSession = ({ user }: AuthSession) => {
  if (!isBrowser()) {
    return;
  }

  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const clearSession = () => {
  if (!isBrowser()) {
    return;
  }

  localStorage.removeItem(USER_KEY);
};
