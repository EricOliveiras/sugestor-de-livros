import api from "./api";

// --- Interfaces para tipagem ---
interface User {
  id: string;
  name: string;
  email: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

// O que esperamos que a API de login retorne
interface AuthResponse {
  user: User;
  token: string;
}

// --- Funções de API ---

// Função de registro (já existe)
export const register = async (data: RegisterData) => {
  const response = await api.post<User>("/users/register", data);
  return response.data;
};

// ADICIONE A NOVA FUNÇÃO DE LOGIN
export const login = async (data: LoginData) => {
  // Faz a requisição e espera uma resposta no formato AuthResponse
  const response = await api.post<AuthResponse>("/users/login", data);
  return response.data; // Retorna { user, token }
};
