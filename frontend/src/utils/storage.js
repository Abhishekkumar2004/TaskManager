const TOKEN_KEY = 'token';

// Save token
export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

// Get token
export const getToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

// Remove token
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

// Check if token exists
export const hasToken = () => {
  return !!localStorage.getItem(TOKEN_KEY);
};