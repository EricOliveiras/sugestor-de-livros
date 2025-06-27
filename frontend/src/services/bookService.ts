import api from "./api";

// --- Interfaces para Tipagem ---

export interface Book {
  id: string;
  googleBooksId: string;
  title: string;
  authors: string;
  synopsis: string;
  coverUrl: string;
  ratings: { value: number }[]; // Array de avaliações
}

// Representa o livro que usamos no estado do frontend da HomePage
export interface BookSuggestion {
  googleBooksId: string;
  title: string;
  authors: string[];
  synopsis: string;
  coverUrl: string;
}

// --- Funções de API ---

export const getSuggestion = async (): Promise<BookSuggestion> => {
  const response = await api.get("/books/suggestion");
  return {
    ...response.data,
    authors: response.data.authors || [], // Correção que já fizemos
  };
};

export const saveBook = async (bookData: BookSuggestion) => {
  const payload = {
    ...bookData,
    authors: Array.isArray(bookData.authors)
      ? bookData.authors.join(", ")
      : bookData.authors,
  };
  const response = await api.post("/me/books", payload);
  return response.data;
};

export const getSavedBooks = async (): Promise<Book[]> => {
  const response = await api.get("/me/books");
  return response.data;
};

export const removeBook = async (bookId: string) => {
  const response = await api.delete(`/me/books/${bookId}`);
  return response.data;
};

export const rateBook = async (bookId: string, value: number) => {
  const response = await api.post(`/books/${bookId}/rate`, { value });
  return response.data;
};
