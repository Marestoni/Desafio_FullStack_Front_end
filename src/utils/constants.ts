export const API_CONFIG = {
  BASE_URL: 'https://localhost:7000/api',
  STALE_TIME: 5 * 60 * 1000,
  CACHE_TIME: 10 * 60 * 1000,
};

export const QUERY_KEYS = {
  USERS: 'users',
  USER: 'user',
  EVENTS: 'events',
  AUTH: 'auth',
} as const;