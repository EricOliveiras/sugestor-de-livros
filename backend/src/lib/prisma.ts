import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

// Esta função define como nosso cliente Prisma é criado.
// Ele SEMPRE será estendido com o Accelerate.
const createPrismaClient = () => {
  return new PrismaClient().$extends(withAccelerate());
};

// Este padrão garante que, em desenvolvimento, não criamos uma nova conexão
// a cada recarregamento, reutilizando a instância global.
const globalForPrisma = globalThis as typeof globalThis & {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

// Em ambiente de não-produção, guardamos a instância para reuso.
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
