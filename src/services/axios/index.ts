import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    // check the token is exist or not
    const accessToken = 'accessToken'; // ??
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      originalRequest.url === '/auth/token'
    ) {
      // remove accessToken
      const navigate = useNavigate();
      navigate('/auth/login');
      return Promise.reject(error);
    }
  },
);

export default axiosInstance;
