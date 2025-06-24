import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Este componente recebe 'children', que são os componentes que ele "abraça"
interface ProtectedRouteProps {
  children: React.ReactElement;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  // 1. PRIMEIRO, VERIFICAMOS SE A AUTENTICAÇÃO AINDA ESTÁ CARREGANDO
  // Isso é MUITO importante para evitar um "flash" para a página de login
  // enquanto o useEffect do AuthContext está checando o localStorage.
  if (isLoading) {
    return <div>Carregando...</div>;
  }

  // 2. DEPOIS QUE TERMINOU DE CARREGAR, VERIFICAMOS SE ESTÁ AUTENTICADO
  if (!isAuthenticated) {
    // Se não estiver autenticado, redireciona para a página de login
    return <Navigate to="/login" replace />;
  }

  // 3. SE ESTIVER AUTENTICADO, RENDERIZA O COMPONENTE FILHO (A PÁGINA PROTEGIDA)
  return children;
};
