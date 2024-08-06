import axios from 'axios';
import { logout } from '../../features/authentication/authSlice';
import store from '../../store';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = store.getState().auth?.access_token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    if (error.response.status === 401) {
      store.dispatch(logout());
      window.location.replace('/login');
      return Promise.reject(error);
    }
  },
);

export default apiClient;
