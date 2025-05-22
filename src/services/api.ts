import axios from 'axios';

export type ApiResponse<T> = {
  success: boolean;
  data: T;
  message: string;
  status: number;
  timestamp: string;
  path: string;
};

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
});

export default api;
