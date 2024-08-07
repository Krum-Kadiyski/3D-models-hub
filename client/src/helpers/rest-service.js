import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { getToken } from "./token";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3030",
});

const addContentTypeInterceptor = (config) => {
  config.headers["Content-Type"] = "application/json";
  return config;
};

const addAuthorizationInterceptor = (config) => {
  const token = getToken();

  if (token) {
    config.headers["X-Authorization"] = token;
  }

  return config;
};

const handleApiReject = ({ response }) => {
  const { data } = response;
  const { code, message } = data;

  enqueueSnackbar(message, {
    variant: "error",
  });

  return {
    error: { code, message },
  };
};

axiosInstance.interceptors.request.use(addContentTypeInterceptor);
axiosInstance.interceptors.request.use(addAuthorizationInterceptor);
axiosInstance.interceptors.response.use(null, handleApiReject);

export default axiosInstance;
