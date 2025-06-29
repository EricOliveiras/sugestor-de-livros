// A CORREÇÃO CRUCIAL: Importamos do '/edge'
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const createPrismaClient = () => {
  // A lógica de estender com Accelerate continua correta
  return new PrismaClient().$extends(withAccelerate());
};

const globalForPrisma = globalThis as typeof globalThis & {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
