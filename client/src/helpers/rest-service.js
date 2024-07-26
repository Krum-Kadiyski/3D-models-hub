import axios from 'axios';

export const restService = axios.create({
  baseURL: 'http://localhost:3030',
});
