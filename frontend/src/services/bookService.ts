import api from "./api";

export interface Book {
  id: string;
  googleBooksId: string;
  title: string;
  authors: string;
  synopsis: string;
  coverUrl: string;
  ratings: { value: number }[];
}

export interface BookSuggestion {
  googleBooksId: string;
  title: string;
  authors: string[];
  synopsis: string;
  coverUrl: string;
}

// SIMPLIFICAMOS ESTA FUNÇÃO: Ela não precisa mais de parâmetros
export const getSuggestion = async (): Promise<BookSuggestion> => {
  const response = await api.get("/books/suggestion");
  return {
    ...response.data,
    authors: response.data.authors || [],
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

export const getFeaturedBooks = async (): Promise<BookSuggestion[]> => {
  const response = await api.get("/books/featured");
  return response.data.map((item: any) => ({
    googleBooksId: item.id,
    title: item.volumeInfo.title,
    authors: item.volumeInfo.authors || [],
    synopsis: item.volumeInfo.description,
    coverUrl: item.volumeInfo.imageLinks?.thumbnail.replace(
      "http://",
      "https://"
    ),
  }));
};
