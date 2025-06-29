import { Context } from "hono";

// O tipo AppEnv agora reflete que teremos 'prisma' e 'userId' no contexto.
type AppEnv = {
  Variables: {
    prisma: any; // Usamos 'any' para simplicidade
    userId: string;
  };
};

// Função para SALVAR um livro na lista do usuário
export const saveBookToList = async (c: Context<AppEnv>) => {
  const prisma = c.get("prisma");
  // CORREÇÃO: Pegamos o userId diretamente do contexto
  const userId = c.get("userId");

  try {
    const { googleBooksId, title, authors, synopsis, coverUrl } =
      await c.req.json();

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
export const getMySavedBooks = async (c: Context<AppEnv>) => {
  const prisma = c.get("prisma");
  // CORREÇÃO: Pegamos o userId diretamente do contexto
  const userId = c.get("userId");

  try {
    const userWithBooks = await prisma.user.findUnique({
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
    });

    if (!userWithBooks) {
      return c.json({ message: "Usuário não encontrado." }, 404);
    }

    return c.json(userWithBooks.savedBooks, 200);
  } catch (error) {
    console.error("Erro ao buscar livros salvos:", error);
    return c.json({ message: "Erro interno do servidor." }, 500);
  }
};

// Função para REMOVER um livro da lista
export const removeBookFromList = async (c: Context<AppEnv>) => {
  const prisma = c.get("prisma");
  // CORREÇÃO: Pegamos o userId diretamente do contexto
  const userId = c.get("userId");
  const bookId = c.req.param("bookId");

  try {
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
export const updateMyProfile = async (c: Context<AppEnv>) => {
  const prisma = c.get("prisma");
  // CORREÇÃO: Pegamos o userId diretamente do contexto
  const userId = c.get("userId");
  const { name, avatarUrl } = await c.req.json();

  try {
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
