// services/events.ts
import { api } from './api';
import type { CalendarEvent } from '../types/user.types';

export const eventsService = {
  async getUserEvents(userId: string): Promise<CalendarEvent[]> {
    const response = await api.get<CalendarEvent[]>(`/Events/user/${userId}`);
    return response.data;
  },

  async syncUserEvents(userId: string): Promise<{ message: string }> {
    const response = await api.post(`/Events/sync/user/${userId}`);
    return response.data;
  },

  async syncAllEvents(): Promise<{ message: string }> {
    const response = await api.post('/Events/sync/all');
    return response.data;
  }
};