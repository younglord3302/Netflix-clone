import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  register: (email, password, name) =>
    api.post('/auth/register', { email, password, name }),
  login: (email, password) =>
    api.post('/auth/login', { email, password }),
  getCurrentUser: () => api.get('/auth/me'),
};

export const movieService = {
  getAll: (params) =>
    api.get('/movies', { params }),
  getFeatured: () => api.get('/movies/featured'),
  getById: (id) => api.get(`/movies/${id}`),
  addToWatchlist: (id) => api.post(`/movies/${id}/watchlist`),
  removeFromWatchlist: (id) => api.delete(`/movies/${id}/watchlist`),
};

export const userService = {
  getProfile: () => api.get('/users/profile'),
  getWatchlist: () => api.get('/users/watchlist'),
  updateWatchHistory: (movieId, progress) =>
    api.post('/users/watch-history', { movieId, progress }),
};

export default api;
