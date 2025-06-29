import { Hono } from "hono";
import { cors } from "hono/cors";
import { createPrismaClient } from "./lib/prisma";
import userRoutes from "./routes/userRoutes";
import bookRoutes from "./routes/bookRoutes";
import meRoutes from "./routes/meRoutes";

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

// Middleware do Prisma com LOGS DE DIAGNÓSTICO
app.use("*", async (c, next) => {
  console.log("[server.ts] Entrando no middleware do Prisma.");
  try {
    const prisma = createPrismaClient(c.env);
    c.set("prisma", prisma);
    console.log(
      "[server.ts] Instância do Prisma parece ter sido criada e anexada ao contexto."
    );
  } catch (error) {
    console.error(
      "[server.ts] ERRO CRÍTICO ao criar a instância do Prisma:",
      error
    );
    // Se o erro acontecer aqui, a requisição para por aqui.
    return c.json(
      { message: "Falha na inicialização do serviço de banco de dados." },
      500
    );
  }

  await next();
  console.log(
    "[server.ts] Saindo do middleware do Prisma (após a rota rodar)."
  );
});

app.use(
  "*",
  cors({
    origin: "https://oraculo-literario.vercel.app",
    allowMethods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
  })
);
app.use("*", async (c, next) => {
  console.log(`[LOG] Recebida Requisição: ${c.req.method} ${c.req.url}`);
  await next();
});

app.route("/users", userRoutes);
app.route("/books", bookRoutes);
app.route("/me", meRoutes);

app.get("/", (c) => c.text("API do Oráculo Literário está no ar!"));

export default app;
