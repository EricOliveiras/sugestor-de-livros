import api from "./api";
import type { User } from "./authService"; // Reutilizamos a interface User

interface UpdateData {
  name?: string;
  avatarUrl?: string;
}

export const updateProfile = async (data: UpdateData): Promise<User> => {
  const response = await api.patch<User>("/me", data);
  return response.data;
};
