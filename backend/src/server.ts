import { Hono } from "hono";
import { cors } from "hono/cors";
import { createPrismaClient } from "./lib/prisma";

// Importamos TODOS os controllers
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

// Definimos os tipos para o ambiente e variáveis do Hono
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

// --- Middlewares Globais ---

// CORS
app.use("*", cors({ origin: "https://oraculo-literario.vercel.app" }));

// Middleware do Prisma: Roda em todas as requisições
app.use("*", async (c, next) => {
  try {
    // Cria a instância do Prisma usando o 'env' da requisição atual
    const prisma = createPrismaClient(c.env);
    // Anexa a instância ao contexto para os controllers usarem
    c.set("prisma", prisma);
    await next();
  } catch (error) {
    console.error("ERRO CRÍTICO AO INICIALIZAR PRISMA:", error);
    return c.json(
      { message: "Falha na inicialização do serviço de banco de dados." },
      500
    );
  }
});

// --- Rotas Públicas ---
app.post("/users/register", registerUser);
app.post("/users/login", loginUser);

// --- Rotas Protegidas ---
const protectedRoutes = new Hono<AppEnv>();
protectedRoutes.use("*", authMiddleware);

// Livros
protectedRoutes.get("/books/featured", getFeaturedBooks);
protectedRoutes.get("/books/suggestion", getBookSuggestion);
protectedRoutes.post("/books/:bookId/rate", rateBook);

// Usuário ('me')
protectedRoutes.get("/me/books", getMySavedBooks);
protectedRoutes.post("/me/books", saveBookToList);
protectedRoutes.delete("/me/books/:bookId", removeBookFromList);
protectedRoutes.patch("/me", updateMyProfile);

// Aplicamos o grupo de rotas protegidas
app.route("/", protectedRoutes);

export default app;
