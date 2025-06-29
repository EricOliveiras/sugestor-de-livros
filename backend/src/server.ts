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
app.use("*", cors({ origin: "https://oraculo-literario.vercel.app" }));
app.use("*", async (c, next) => {
  try {
    const prisma = createPrismaClient(c.env);
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

// --- Rotas Públicas (NÃO precisam de token) ---
app.post("/users/register", registerUser);
app.post("/users/login", loginUser);
// A CORREÇÃO: Movemos a rota de 'featured' para a área pública
app.get("/books/featured", getFeaturedBooks);

// --- Rotas Protegidas (PRECISAM de token) ---
const protectedRoutes = new Hono<AppEnv>();
protectedRoutes.use("*", authMiddleware);

// A rota de 'featured' foi REMOVIDA daqui.
protectedRoutes.get("/books/suggestion", getBookSuggestion);
protectedRoutes.post("/books/:bookId/rate", rateBook);
protectedRoutes.get("/me/books", getMySavedBooks);
protectedRoutes.post("/me/books", saveBookToList);
protectedRoutes.delete("/me/books/:bookId", removeBookFromList);
protectedRoutes.patch("/me", updateMyProfile);

app.route("/", protectedRoutes);

export default app;
