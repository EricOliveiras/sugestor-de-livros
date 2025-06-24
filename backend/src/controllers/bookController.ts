import { Request, Response } from "express";
import axios from "axios";

interface BookVolume {
  id: string;
  volumeInfo: {
    title: string;
    authors?: string[];
    description?: string;
    imageLinks?: {
      thumbnail: string;
    };
  };
}

export const getBookSuggestion = async (req: Request, res: Response) => {
  try {
    const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
    if (!apiKey || apiKey === "SUA_CHAVE_API_AQUI") {
      console.error("ERRO CRÍTICO: Chave da API do Google não configurada!");
      return res
        .status(500)
        .json({ message: "Erro de configuração do servidor." });
    }

    const searchTerms = [
      "romance",
      "ficção científica",
      "fantasia",
      "mistério",
      "biografia",
      "tecnologia",
      "arte",
      "história",
    ];
    const randomTerm =
      searchTerms[Math.floor(Math.random() * searchTerms.length)];

    const response = await axios.get(
      "https://www.googleapis.com/books/v1/volumes",
      {
        params: {
          q: `subject:${randomTerm}`,
          maxResults: 40,
          printType: "books",
          langRestrict: "pt",
          key: apiKey,
        },
      }
    );

    const items = response.data.items;

    if (!items) {
      return res
        .status(404)
        .json({
          message: "Nenhuma sugestão encontrada para o termo. Tente novamente.",
        });
    }

    const validBooks: BookVolume[] = items.filter(
      (item: BookVolume) =>
        item.volumeInfo.title &&
        item.volumeInfo.authors &&
        item.volumeInfo.description &&
        item.volumeInfo.imageLinks?.thumbnail
    );

    if (validBooks.length === 0) {
      return res
        .status(404)
        .json({
          message:
            "Não foi possível encontrar um livro com todos os detalhes. Tente novamente.",
        });
    }

    const randomBook =
      validBooks[Math.floor(Math.random() * validBooks.length)];

    const suggestion = {
      googleBooksId: randomBook.id,
      title: randomBook.volumeInfo.title,
      authors: randomBook.volumeInfo.authors,
      synopsis: randomBook.volumeInfo.description,
      coverUrl: randomBook.volumeInfo.imageLinks!.thumbnail.replace(
        "http://",
        "https://"
      ),
    };

    return res.status(200).json(suggestion);
  } catch (error: any) {
    // Mantemos um log de erro detalhado para o caso de a API do Google falhar
    console.error(
      "ERRO NO CONTROLLER getBookSuggestion:",
      error.response?.data?.error || error.message
    );
    return res
      .status(500)
      .json({
        message:
          "Erro interno do servidor ao se comunicar com a API de livros.",
      });
  }
};
