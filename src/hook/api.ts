import axios, { AxiosError, AxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalReq = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (error.response?.status === 401 && !originalReq._retry) {
      originalReq._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token');

        const { data: refreshRes } = await axios.post<{
          accessToken: string;
          refreshToken: string;
        }>(
          `${import.meta.env.VITE_BASE_URL}/v1/member/auth/refresh`,
          { refreshToken },
          { withCredentials: true }
        );

        localStorage.setItem('accessToken', refreshRes.accessToken);
        localStorage.setItem('refreshToken', refreshRes.refreshToken);

        api.defaults.headers.common['Authorization'] =
          `Bearer ${refreshRes.accessToken}`;
        if (originalReq.headers) {
          originalReq.headers['Authorization'] =
            `Bearer ${refreshRes.accessToken}`;
        }

        return api(originalReq);
      } catch (_err) {
        localStorage.clear();
        window.location.href = '/login';
        return Promise.reject(_err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
