import { PrismaClient } from '@prisma/client';

// Cria uma única instância global do PrismaClient
export const prisma = new PrismaClient();