import api from "./api";

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string; // Mantemos aqui para o objeto do usuário logado
}

// A interface de registro agora é mais simples
interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  user: User;
  token: string;
}

export const register = async (data: RegisterData) => {
  const response = await api.post<User>("/users/register", data);
  return response.data;
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>("/users/login", data);
  return response.data;
};
