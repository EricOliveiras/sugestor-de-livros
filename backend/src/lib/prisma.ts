import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

// Esta função recebe o 'env' da Cloudflare, que contém nossos Secrets,
// e cria um cliente Prisma configurado corretamente para o Data Proxy.
export const createPrismaClient = (env: { DATABASE_URL: string }) => {
  return new PrismaClient({
    datasources: {
      db: {
        url: env.DATABASE_URL,
      },
    },
  }).$extends(withAccelerate());
};
