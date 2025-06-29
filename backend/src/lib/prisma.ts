import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

// Esta função recebe o 'env' da Cloudflare e cria um cliente Prisma
// usando a DATABASE_URL que está dentro dele.
export const createPrismaClient = (env: any) => {
  return new PrismaClient({
    datasources: {
      db: {
        url: env.DATABASE_URL,
      },
    },
  }).$extends(withAccelerate());
};
