import axios from 'axios';
import type { ApiResponse } from '@travel/shared';
import { API_TIMEOUT } from '../constants';

const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

export const apiClient = axios.create({
  baseURL,
  timeout: API_TIMEOUT,
});

export async function unwrapResponse<T>(request: Promise<{ data: ApiResponse<T> }>): Promise<T> {
  const response = await request;
  if (!response.data.success) {
    throw new Error(response.data.message || '请求失败');
  }
  return response.data.data;
}
