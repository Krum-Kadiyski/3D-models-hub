import { enqueueSnackbar } from 'notistack';

export const restService = {
  get: (url) => fetch(`http://localhost:3030${url}`),
  post: async (url, data) => {
    try {
      const response = await fetch(`http://localhost:3030${url}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        enqueueSnackbar(result.message, {
          variant: 'error',
        });

        return null;
      }

      return result;
    } catch (error) {
      enqueueSnackbar(error.message, {
        variant: 'error',
      });
    }
  },
};
