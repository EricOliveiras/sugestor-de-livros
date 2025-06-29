import { Hono } from "hono";
import { cors } from "hono/cors";
import { createPrismaClient } from "./lib/prisma";
import userRoutes from "./routes/userRoutes";
import bookRoutes from "./routes/bookRoutes";
import meRoutes from "./routes/meRoutes";

// Adicionamos os tipos para o nosso contexto Hono
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

const app = new Hono<AppEnv>();

// Middleware do Prisma: Roda em todas as requisições
app.use("*", async (c, next) => {
  // Cria uma instância do Prisma para esta requisição usando o 'env'
  const prisma = createPrismaClient(c.env);
  // Anexa ao contexto para que os controllers possam usá-la
  c.set("prisma", prisma);
  await next();
});

// Aplicando o CORS
app.use(
  "*",
  cors({
    origin: "https://oraculo-literario.vercel.app",
    allowMethods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);

// Log de Requisições (opcional, pode remover no deploy final se quiser)
app.use("*", async (c, next) => {
  console.log(`[LOG] Recebida Requisição: ${c.req.method} ${c.req.url}`);
  await next();
});

// Encadeando as Rotas
app.route("/users", userRoutes);
app.route("/books", bookRoutes);
app.route("/me", meRoutes);

app.get("/", (c) => {
  return c.text("API do Oráculo Literário está no ar!");
});

// Apenas exportamos o app. Nenhuma chamada de 'serve' ou 'listen' aqui.
export default app;
