import { Request, Response } from "express";
import axios from "axios";
import { AuthenticatedRequest } from "../types/custom";
import { prisma } from "../lib/prisma";

interface BookVolume {
  id: string;
  volumeInfo?: {
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
      return res.status(500).json({
        message: "Erro de configuração do servidor: Chave da API ausente.",
      });
    }

    // 1. REFINAMOS OS TERMOS DE BUSCA para incluir temas brasileiros
    const searchTerms = [
      "romance brasileiro",
      "literatura brasileira",
      "autores brasileiros",
      "ficção científica brasileira",
      "fantasia nacional",
      "poesia brasileira",
      "história do brasil",
    ];
    const randomTerm =
      searchTerms[Math.floor(Math.random() * searchTerms.length)];

    const response = await axios.get(
      "https://www.googleapis.com/books/v1/volumes",
      {
        params: {
          q: randomTerm, // Usamos os novos termos aqui
          maxResults: 40,
          printType: "books",
          // 2. FILTRO DE IDIOMA: Mais específico para pt-BR
          langRestrict: "pt-BR",
          // 3. FILTRO DE PAÍS: Prioriza livros disponíveis no Brasil
          country: "BR",
          key: apiKey,
        },
      }
    );

    const items = response.data.items;

    if (!items || items.length === 0) {
      return res.status(404).json({
        message: "Nenhuma sugestão encontrada para o termo. Tente novamente.",
      });
    }

    const validBooks: BookVolume[] = items.filter(
      (item: BookVolume) =>
        item.volumeInfo &&
        item.volumeInfo.title &&
        item.volumeInfo.authors &&
        item.volumeInfo.description &&
        item.volumeInfo.imageLinks?.thumbnail
    );

    if (validBooks.length === 0) {
      return res.status(404).json({
        message:
          "A API retornou livros, mas nenhum com todos os detalhes necessários. Tente outra vez.",
      });
    }

    const randomBook =
      validBooks[Math.floor(Math.random() * validBooks.length)];

    const suggestion = {
      googleBooksId: randomBook.id,
      title: randomBook.volumeInfo!.title,
      authors: randomBook.volumeInfo!.authors,
      synopsis: randomBook.volumeInfo!.description,
      coverUrl: randomBook.volumeInfo!.imageLinks!.thumbnail.replace(
        "http://",
        "https://"
      ),
    };

    return res.status(200).json(suggestion);
  } catch (error: any) {
    console.error(
      "ERRO no getBookSuggestion:",
      error.response?.data?.error || error.message
    );
    return res
      .status(500)
      .json({ message: "Erro ao se comunicar com a API de livros." });
  }
};

export const rateBook = async (req: AuthenticatedRequest, res: Response) => {
  const userId = req.userId;
  const { bookId } = req.params;
  const { value } = req.body; // A nota (ex: 4) virá no corpo da requisição

  if (!userId) {
    return res.status(401).json({ message: "Usuário não autenticado." });
  }

  // Validação da nota
  if (typeof value !== "number" || value < 1 || value > 5) {
    return res
      .status(400)
      .json({ message: "A avaliação deve ser um número entre 1 e 5." });
  }

  try {
    const newRating = await prisma.rating.upsert({
      // Onde procurar por uma avaliação existente:
      where: {
        userId_bookId: {
          // Usamos a chave única composta que definimos no schema
          userId: userId,
          bookId: bookId,
        },
      },
      // Se já existir, ATUALIZE a nota:
      update: {
        value: value,
      },
      // Se não existir, CRIE uma nova avaliação:
      create: {
        value: value,
        userId: userId,
        bookId: bookId,
      },
    });

    return res.status(200).json(newRating);
  } catch (error) {
    console.error("Erro ao avaliar o livro:", error);
    return res
      .status(500)
      .json({ message: "Erro interno ao processar a avaliação." });
  }
};

export const getFeaturedBooks = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
    if (!apiKey || apiKey === "SUA_CHAVE_API_AQUI") {
      return res
        .status(500)
        .json({ message: "Erro de configuração do servidor." });
    }

    // Fazemos uma busca por um tema popular e relevante
    const response = await axios.get(
      "https://www.googleapis.com/books/v1/volumes",
      {
        params: {
          q: "best sellers ficção brasileira",
          maxResults: 10, // Pegamos 10 livros para o carrossel
          printType: "books",
          langRestrict: "pt-BR",
          country: "BR",
          key: apiKey,
        },
      }
    );

    const items = response.data.items;

    if (!items || items.length === 0) {
      return res
        .status(404)
        .json({ message: "Nenhum livro em destaque encontrado." });
    }

    // Usamos o mesmo filtro de qualidade para garantir que os livros têm os dados necessários
    const validBooks = items.filter(
      (item: BookVolume) =>
        item.volumeInfo &&
        item.volumeInfo.title &&
        item.volumeInfo.authors &&
        item.volumeInfo.imageLinks?.thumbnail
    );

    return res.status(200).json(validBooks);
  } catch (error: any) {
    console.error(
      "ERRO ao buscar livros em destaque:",
      error.response?.data?.error || error.message
    );
    return res
      .status(500)
      .json({ message: "Erro ao buscar livros em destaque." });
  }
};
