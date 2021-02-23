/**
 * true if NODE_ENV === 'production', false otherwise
 */
export const __prod__ = process.env.NODE_ENV === 'production';

// TODO: Add production URL
export const SERVER_URL = __prod__ ? '' : 'http://localhost:8000';

export const API_ROUTES = {
  USERS: `${SERVER_URL}/api/users`,
  ACCOUNTS: `${SERVER_URL}/api/accounts`,
  TRANSACTIONS: `${SERVER_URL}/api/transactions`,
};

export const AUTH_ROUTES = {
  REGISTER: `${SERVER_URL}/auth/register`,
  LOGIN: `${SERVER_URL}/auth/login`,
  LOGOUT: `${SERVER_URL}/auth/logout`,
  DELETE: `${SERVER_URL}/auth/delete`,
};
