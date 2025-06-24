import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import {
  login as apiLogin,
  register as apiRegister,
} from "../services/authService";

// --- Interfaces para Tipagem ---
interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean; // Para sabermos se a autenticação inicial está carregando
  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

// Criamos o contexto com um valor padrão
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Este é o nosso provedor
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Este useEffect roda UMA VEZ quando a aplicação carrega
  useEffect(() => {
    // Verificamos se há um token salvo no localStorage do navegador
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      // Se encontramos, definimos o estado de autenticação
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    // Terminamos o carregamento inicial
    setIsLoading(false);
  }, []);

  // Função de Login
  const login = async (data: any) => {
    const response = await apiLogin(data);
    // Definimos o estado
    setToken(response.token);
    setUser(response.user);
    // Salvamos no localStorage para persistir o login
    localStorage.setItem("token", response.token);
    localStorage.setItem("user", JSON.stringify(response.user));
  };

  // Função de Registro (opcional, mas bom ter aqui)
  const register = async (data: any) => {
    await apiRegister(data);
    // Após o registro, pode-se optar por logar o usuário ou redirecionar para o login
  };

  // Função de Logout
  const logout = () => {
    // Limpamos o estado
    setUser(null);
    setToken(null);
    // Removemos do localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  const value = {
    isAuthenticated: !!token, // Se existe token, está autenticado
    user,
    token,
    isLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook customizado para facilitar o uso do contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
