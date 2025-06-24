import api from "./api";

export interface Book {
  id: string;
  googleBooksId: string;
  title: string;
  authors: string;
  synopsis: string;
  coverUrl: string;
}

export interface BookSuggestion {
  googleBooksId: string;
  title: string;
  authors: string[];
  synopsis: string;
  coverUrl: string;
}

export const getSuggestion = async (): Promise<BookSuggestion> => {
  const response = await api.get("/books/suggestion");
  return {
    ...response.data,
    authors: response.data.authors ? response.data.authors.split(", ") : [],
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

// ADICIONE ESTA NOVA FUNÇÃO
export const removeBook = async (bookId: string) => {
  const response = await api.delete(`/me/books/${bookId}`);
  return response.data;
};
