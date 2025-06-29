import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const createPrismaClient = (env: any) => {
  // LOG DE DIAGNÓSTICO
  console.log("[prisma.ts] Tentando criar cliente Prisma.");
  if (env.DATABASE_URL) {
    console.log("[prisma.ts] Variável DATABASE_URL encontrada.");
  } else {
    // Este log é o mais importante. Se ele aparecer, encontramos o problema.
    console.error(
      "[prisma.ts] ERRO: Variável DATABASE_URL NÃO encontrada no 'env'!"
    );
  }

  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: env.DATABASE_URL, // O erro provavelmente está aqui
      },
    },
  }).$extends(withAccelerate());

  console.log("[prisma.ts] Instância do Prisma Client criada com sucesso.");
  return prisma;
};
