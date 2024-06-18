
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
  razon_social?: string; // Campo opcional para la razón social
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
  success?: boolean; // Propiedad opcional para indicar éxito o falla
  error?: string;   // Propiedad opcional para el mensaje de error
}