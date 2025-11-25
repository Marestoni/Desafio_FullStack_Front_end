export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  displayName: string;
}

export interface LoginResponse {
  token: string;
  expires: string;
  user: User;
}

export interface User {
  id: string;
  displayName: string;
  mail: string;
  jobTitle?: string;
  department?: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}