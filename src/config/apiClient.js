import axios from 'axios';
import i18n from './i18n';

const apiClient = axios.create();

// Interceptor to inject the active i18n language as Accept-Language header in all outgoing requests
apiClient.interceptors.request.use(
  (config) => {
    const language = i18n.language || 'en';
    config.headers['Accept-Language'] = language;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
