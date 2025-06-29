import { Context } from "hono";
import { prisma } from "../lib/prisma";
import { User, Book, Rating } from "@prisma/client";

// 2. CRIAMOS NOSSO TIPO EXPLÍCITO E COMPLETO
// Um usuário que INCLUI uma lista de livros, onde cada livro INCLUI uma lista de ratings.
type UserWithSavedBooks = User & {
  savedBooks: (Book & {
    ratings: Rating[];
  })[];
};

// Função para SALVAR um livro na lista do usuário
export const saveBookToList = async (c: Context) => {
  try {
    const userId = c.get("userId"); // Pegamos o userId do contexto
    const { googleBooksId, title, authors, synopsis, coverUrl } =
      await c.req.json(); // Pegamos o corpo da requisição

    if (!userId) {
      return c.json({ message: "Usuário não autenticado." }, 401);
    }

    const book = await prisma.book.upsert({
      where: { googleBooksId },
      update: { title, authors, synopsis, coverUrl },
      create: { googleBooksId, title, authors, synopsis, coverUrl },
    });

    await prisma.user.update({
      where: { id: userId },
      data: {
        savedBooks: {
          connect: { id: book.id },
        },
      },
    });

    return c.json({ message: "Livro salvo com sucesso!" }, 200);
  } catch (error) {
    console.error("Erro ao salvar livro:", error);
    return c.json({ message: "Erro interno ao salvar o livro." }, 500);
  }
};

// Função para BUSCAR a lista de livros do usuário
// Função para BUSCAR a lista de livros do usuário
export const getMySavedBooks = async (c: Context) => {
  try {
    const userId = c.get("userId");

    if (!userId) {
      return c.json({ message: "Usuário não autenticado." }, 401);
    }

    // 3. USAMOS NOSSO TIPO PARA GARANTIR QUE O TYPESCRIPT ENTENDA O RESULTADO
    const userWithBooks = (await prisma.user.findUnique({
      where: { id: userId },
      include: {
        savedBooks: {
          orderBy: { title: "asc" },
          include: {
            ratings: {
              where: { userId: userId },
            },
          },
        },
      },
    })) as UserWithSavedBooks | null;

    if (!userWithBooks) {
      return c.json({ message: "Usuário não encontrado." }, 404);
    }

    // Agora o TypeScript sabe que userWithBooks.savedBooks existe, e o erro desaparece.
    return c.json(userWithBooks.savedBooks, 200);
  } catch (error) {
    console.error("Erro ao buscar livros salvos:", error);
    return c.json({ message: "Erro interno do servidor." }, 500);
  }
};

// Função para REMOVER um livro da lista
export const removeBookFromList = async (c: Context) => {
  try {
    const userId = c.get("userId");
    const bookId = c.req.param("bookId"); // Pegamos o parâmetro da URL

    if (!userId) {
      return c.json({ message: "Usuário não autenticado." }, 401);
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        savedBooks: {
          disconnect: { id: bookId },
        },
      },
    });

    return c.json({ message: "Livro removido da lista com sucesso!" }, 200);
  } catch (error) {
    console.error("Erro ao remover livro:", error);
    return c.json({ message: "Erro interno ao remover o livro." }, 500);
  }
};

// Função para ATUALIZAR o perfil do usuário
export const updateMyProfile = async (c: Context) => {
  try {
    const userId = c.get("userId");
    const { name, avatarUrl } = await c.req.json();

    if (!userId) {
      return c.json({ message: "Usuário não autenticado." }, 401);
    }

    const dataToUpdate: { name?: string; avatarUrl?: string } = {};
    if (name) dataToUpdate.name = name;
    if (avatarUrl) dataToUpdate.avatarUrl = avatarUrl;

    if (Object.keys(dataToUpdate).length === 0) {
      return c.json(
        { message: "Nenhum dado fornecido para atualização." },
        400
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: dataToUpdate,
    });

    const { password, ...userWithoutPassword } = updatedUser;

    return c.json(userWithoutPassword, 200);
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    return c.json({ message: "Erro interno ao atualizar o perfil." }, 500);
  }
};
