import { api } from './api';

export const syncService = {
  async startSync(): Promise<{ message: string }> {
    const response = await api.post('/Sync/start');
    return response.data;
  },

  async scheduleSync(cronExpression: string = '0 */6 * * *'): Promise<{ message: string; cronExpression: string }> {
    const response = await api.post(`/Sync/schedule?cronExpression=${cronExpression}`);
    return response.data;
  },

  async syncUsers(): Promise<{ message: string }> {
    const response = await api.post('/Sync/users');
    return response.data;
  }
};