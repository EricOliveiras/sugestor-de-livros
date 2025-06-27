import { Response } from "express";
import { AuthenticatedRequest } from "../types/custom";
import { prisma } from "../lib/prisma";

// Função para SALVAR um livro na lista do usuário
export const saveBookToList = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const userId = req.userId;
  // Os dados do livro virão no corpo da requisição
  const { googleBooksId, title, authors, synopsis, coverUrl } = req.body;

  if (!userId) {
    return res.status(401).json({ message: "Usuário não autenticado." });
  }

  try {
    // 'upsert': Cria o livro se ele não existir em nossa DB, ou apenas o utiliza se já existir.
    const book = await prisma.book.upsert({
      where: { googleBooksId },
      update: { title, authors, synopsis, coverUrl }, // Atualiza caso os dados mudem na API do Google
      create: { googleBooksId, title, authors, synopsis, coverUrl },
    });

    // Conecta o livro ao usuário
    await prisma.user.update({
      where: { id: userId },
      data: {
        savedBooks: {
          connect: { id: book.id },
        },
      },
    });

    return res.status(200).json({ message: "Livro salvo com sucesso!" });
  } catch (error) {
    console.error("Erro ao salvar livro:", error);
    return res.status(500).json({ message: "Erro interno ao salvar o livro." });
  }
};

// Função para BUSCAR a lista de livros do usuário
export const getMySavedBooks = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const userId = req.userId;

  if (!userId) {
    return res.status(401).json({ message: "Usuário não autenticado." });
  }

  try {
    const userWithBooks = await prisma.user.findUnique({
      where: { id: userId },
      // ESTA É A MUDANÇA: um 'include' dentro de outro
      include: {
        savedBooks: {
          orderBy: { title: "asc" },
          // Para cada livro salvo, inclua também as avaliações...
          include: {
            ratings: {
              // ...mas apenas a avaliação que pertence ao usuário logado.
              where: { userId: userId },
            },
          },
        },
      },
    });

    if (!userWithBooks) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    // Agora cada livro dentro de 'savedBooks' terá um campo 'ratings'
    // que será um array com 0 ou 1 avaliação (a do usuário atual).
    return res.status(200).json(userWithBooks.savedBooks);
  } catch (error) {
    console.error("Erro ao buscar livros salvos:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

export const removeBookFromList = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const userId = req.userId;
  // O ID do livro virá como um parâmetro na URL (ex: /api/me/books/ID_DO_LIVRO)
  const { bookId } = req.params;

  if (!userId) {
    return res.status(401).json({ message: "Usuário não autenticado." });
  }

  try {
    // Usamos o 'disconnect' do Prisma para remover a relação
    await prisma.user.update({
      where: { id: userId },
      data: {
        savedBooks: {
          disconnect: { id: bookId },
        },
      },
    });

    return res
      .status(200)
      .json({ message: "Livro removido da lista com sucesso!" });
  } catch (error) {
    console.error("Erro ao remover livro:", error);
    return res
      .status(500)
      .json({ message: "Erro interno ao remover o livro." });
  }
};

export const updateMyProfile = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const userId = req.userId;
  // Pegamos apenas o nome e o avatar do corpo da requisição
  const { name, avatarUrl } = req.body;

  if (!userId) {
    return res.status(401).json({ message: "Usuário não autenticado." });
  }

  // Criamos um objeto de dados apenas com os campos que foram enviados
  const dataToUpdate: { name?: string; avatarUrl?: string } = {};
  if (name) dataToUpdate.name = name;
  if (avatarUrl) dataToUpdate.avatarUrl = avatarUrl;

  // Verificamos se há algo para atualizar
  if (Object.keys(dataToUpdate).length === 0) {
    return res
      .status(400)
      .json({ message: "Nenhum dado fornecido para atualização." });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: dataToUpdate,
    });

    // Removemos a senha do objeto antes de enviá-lo de volta
    const { password, ...userWithoutPassword } = updatedUser;

    return res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error("Erro ao atualizar perfil:", error);
    return res
      .status(500)
      .json({ message: "Erro interno ao atualizar o perfil." });
  }
};
