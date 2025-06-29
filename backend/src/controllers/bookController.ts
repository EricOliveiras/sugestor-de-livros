import { Context } from "hono";
import axios from "axios";

// A interface não precisa mudar
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

// A assinatura muda para (c: Context)
export const getBookSuggestion = async (c: Context) => {
  try {
    const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
    if (!apiKey || apiKey === "SUA_CHAVE_API_AQUI") {
      return c.json(
        { message: "Erro de configuração do servidor: Chave da API ausente." },
        500
      );
    }

    // req.query vira c.req.query()
    const { genre, lang } = c.req.query();
    let searchTerm: string;
    let languageFilter: string = "pt-BR";

    if (genre && typeof genre === "string" && genre.trim() !== "") {
      searchTerm = genre.trim();
    } else {
      const defaultSearchTerms = [
        "literatura brasileira",
        "autores brasileiros",
        "romance",
        "suspense",
      ];
      searchTerm =
        defaultSearchTerms[
          Math.floor(Math.random() * defaultSearchTerms.length)
        ];
    }

    if (lang && typeof lang === "string" && lang.trim() !== "") {
      languageFilter = lang.trim();
    }

    const aprimoredQuery = `${searchTerm} subject:${searchTerm}`;

    const response = await axios.get(
      "https://www.googleapis.com/books/v1/volumes",
      {
        params: {
          q: aprimoredQuery,
          maxResults: 40,
          printType: "books",
          langRestrict: languageFilter,
          country: languageFilter === "pt-BR" ? "BR" : undefined,
          key: apiKey,
        },
      }
    );

    const items = response.data.items;

    if (!items || items.length === 0) {
      return c.json(
        {
          message: "Nenhuma sugestão encontrada para o termo. Tente novamente.",
        },
        404
      );
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
      return c.json(
        {
          message:
            "A API retornou livros, mas nenhum com todos os detalhes necessários. Tente outra vez.",
        },
        404
      );
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

    // res.status().json() vira c.json()
    return c.json(suggestion, 200);
  } catch (error: any) {
    console.error(
      "ERRO no getBookSuggestion:",
      error.response?.data?.error || error.message
    );
    return c.json(
      { message: "Erro ao se comunicar com a API de livros." },
      500
    );
  }
};

export const rateBook = async (c: Context) => {
  const prisma = c.get("prisma");
  try {
    const userId = c.get("userId"); // req.userId vira c.get('userId')
    const bookId = c.req.param("bookId"); // req.params vira c.req.param()
    const { value } = await c.req.json(); // req.body vira await c.req.json()

    if (!userId) {
      return c.json({ message: "Usuário não autenticado." }, 401);
    }

    if (typeof value !== "number" || value < 1 || value > 5) {
      return c.json(
        { message: "A avaliação deve ser um número entre 1 e 5." },
        400
      );
    }

    const newRating = await prisma.rating.upsert({
      where: { userId_bookId: { userId: userId, bookId: bookId } },
      update: { value: value },
      create: { value: value, userId: userId, bookId: bookId },
    });

    return c.json(newRating, 200);
  } catch (error) {
    console.error("Erro ao avaliar o livro:", error);
    return c.json({ message: "Erro interno ao processar a avaliação." }, 500);
  }
};

export const getFeaturedBooks = async (c: Context) => {
  try {
    const apiKey = process.env.GOOGLE_BOOKS_API_KEY;
    if (!apiKey || apiKey === "SUA_CHAVE_API_AQUI") {
      return c.json({ message: "Erro de configuração do servidor." }, 500);
    }

    const response = await axios.get(
      "https://www.googleapis.com/books/v1/volumes",
      {
        params: {
          q: "best sellers ficção brasileira",
          maxResults: 10,
          printType: "books",
          langRestrict: "pt-BR",
          country: "BR",
          key: apiKey,
        },
      }
    );

    const items = response.data.items;

    if (!items || items.length === 0) {
      return c.json({ message: "Nenhum livro em destaque encontrado." }, 404);
    }

    const validBooks = items.filter(
      (item: BookVolume) =>
        item.volumeInfo &&
        item.volumeInfo.title &&
        item.volumeInfo.authors &&
        item.volumeInfo.imageLinks?.thumbnail
    );

    return c.json(validBooks, 200);
  } catch (error: any) {
    console.error(
      "ERRO ao buscar livros em destaque:",
      error.response?.data?.error || error.message
    );
    return c.json({ message: "Erro ao buscar livros em destaque." }, 500);
  }
};
