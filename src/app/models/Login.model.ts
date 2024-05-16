
export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  message: string;
  token: string;
  user: UserResponse;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  role: string;
}

export interface RegisterResponse {
  message: string;
  user: UserResponse;
}

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface BackResponse {
  estado: number;
  mensaje: string;
  objeto: any;
  token: string;
}
