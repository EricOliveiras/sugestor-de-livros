import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  type ReactNode,
} from "react";
import {
  login as apiLogin,
  register as apiRegister,
  type User,
} from "../services/authService";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  updateUserData: (newUserData: User) => void; // A NOVA FUNÇÃO
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

  const updateUserData = (newUserData: User) => {
    setUser(newUserData);
    localStorage.setItem("user", JSON.stringify(newUserData));
  };

  const value = {
    isAuthenticated: !!token,
    user,
    token,
    isLoading,
    login,
    register,
    logout,
    updateUserData, // Expondo a nova função
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
