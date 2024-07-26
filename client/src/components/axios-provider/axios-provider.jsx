import { useEffect } from 'react';
import { enqueueSnackbar } from 'notistack';
import { useUser } from '../../hooks/use-user';
import { restService } from '../../helpers';

const AxiosProvider = ({ children }) => {
  const { user } = useUser();

  useEffect(() => {
    restService.interceptors.request.use((config) => {
      if (user?.token) {
        config.headers['X-Authorization'] = user.token;
      }

      return config;
    });

    restService.interceptors.response.use(null, ({ response }) => {
      const { data } = response;
      const { code, message } = data;

      enqueueSnackbar(message, {
        variant: 'error',
      });

      return {
        error: { code, message },
      };
    });
  }, [user?.token]);

  return children;
};
export default AxiosProvider;
