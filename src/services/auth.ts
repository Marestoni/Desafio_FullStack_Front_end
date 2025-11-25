import { api } from './api';
import type { LoginRequest, LoginResponse, RegisterRequest } from '../types/auth.types';

export const authService = {
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/login', credentials);
    return response.data;
  },

  async register(userData: RegisterRequest): Promise<LoginResponse> {
    const response = await api.post<LoginResponse>('/auth/register', userData);
    return response.data;
  },

  async validateToken(): Promise<{ message: string }> {
    const response = await api.post('/auth/validate');
    return response.data;
  },

  logout(): void {
    localStorage.removeItem('auth_token');
  }
};