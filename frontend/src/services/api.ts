import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api",
});

// ESTE É O NOSSO INTERCEPTOR "PORTEIRO AUTOMÁTICO"
api.interceptors.request.use(
  (config) => {
    // 1. Pega o token do localStorage
    const token = localStorage.getItem("token");

    // 2. Se o token existir, adiciona ao cabeçalho (header) da requisição
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 3. Retorna a configuração da requisição modificada (ou não)
    return config;
  },
  (error) => {
    // Em caso de erro na configuração da requisição
    return Promise.reject(error);
  }
);

export default api;
