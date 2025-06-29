import { Hono } from "hono";
import { cors } from "hono/cors";
import { createPrismaClient } from "./lib/prisma";

// Importamos TODOS os controllers e o middleware

import { loginUser, registerUser } from "./controllers/userController";
import {
  getBookSuggestion,
  getFeaturedBooks,
  rateBook,
} from "./controllers/bookController";
import {
  getMySavedBooks,
  removeBookFromList,
  saveBookToList,
  updateMyProfile,
} from "./controllers/meController";
import { authMiddleware } from "./middleware/uthMiddleware";

// Tipos para o Hono
type AppEnv = {
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
    GOOGLE_BOOKS_API_KEY: string;
  };
  Variables: {
    prisma: ReturnType<typeof createPrismaClient>;
  };
};

const app = new Hono<AppEnv>().basePath("/api");

// --- Middlewares ---
app.use("*", cors({ origin: "https://oraculo-literario.vercel.app" }));

// Middleware do Prisma para criar e anexar o cliente
app.use("*", async (c, next) => {
  try {
    const prisma = createPrismaClient(c.env);
    c.set("prisma", prisma);
    await next();
  } catch (error) {
    console.error("ERRO CRÍTICO ao criar a instância do Prisma:", error);
    return c.json(
      { message: "Falha na inicialização do serviço de banco de dados." },
      500
    );
  }
});

// --- Rotas Públicas (sem autenticação) ---
app.post("/users/register", registerUser);
app.post("/users/login", loginUser);

// --- Rotas Protegidas (com autenticação) ---
// Criamos um grupo de rotas que usará o authMiddleware
const protectedRoutes = new Hono<AppEnv>();
protectedRoutes.use("*", authMiddleware);

// Rotas de Livros
protectedRoutes.get("/books/featured", getFeaturedBooks);
protectedRoutes.get("/books/suggestion", getBookSuggestion);
protectedRoutes.post("/books/:bookId/rate", rateBook);

// Rotas do Usuário Logado ('/me')
protectedRoutes.get("/me/books", getMySavedBooks);
protectedRoutes.post("/me/books", saveBookToList);
protectedRoutes.delete("/me/books/:bookId", removeBookFromList);
protectedRoutes.patch("/me", updateMyProfile);

// Conectamos o grupo de rotas protegidas à aplicação principal
app.route("/", protectedRoutes);

export default app;
