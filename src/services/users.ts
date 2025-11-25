import { api } from './api';
import type { UserDto, UserWithEvents } from '../types/user.types';

export const usersService = {
  async getAllUsers(): Promise<UserDto[]> {
    const response = await api.get<UserDto[]>('/users');
    return response.data;
  },

  async getUserWithEvents(userId: string): Promise<UserWithEvents> {
    const response = await api.get<UserWithEvents>(`/users/${userId}`);
    return response.data;
  },

  async syncUsers(): Promise<{ message: string }> {
    const response = await api.post('/users/sync');
    return response.data;
  }
};