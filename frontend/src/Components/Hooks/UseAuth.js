export const useAuth = () => {
  const isAuthenticated = !!(localStorage.getItem('authToken'));
  return isAuthenticated;
};
