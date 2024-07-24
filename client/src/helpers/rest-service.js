import axios from 'axios';
import { enqueueSnackbar } from 'notistack';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3030',
});

const addContentTypeInterceptor = (config) => {
  config.headers['Content-Type'] = 'application/json';
  return config;
};

// const addAtorizationInterceptor = (config) => {};

const handleApiReject = ({ response }) => {
  const { data } = response;

  enqueueSnackbar(data.message, {
    variant: 'error',
  });

  return null;
};

axiosInstance.interceptors.request.use(addContentTypeInterceptor);
axiosInstance.interceptors.response.use(null, handleApiReject);

export default axiosInstance;
