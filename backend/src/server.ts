import { Hono } from "hono";
import { cors } from "hono/cors";
import userRoutes from "./routes/userRoutes";
import bookRoutes from "./routes/bookRoutes";
import meRoutes from "./routes/meRoutes";

const app = new Hono().basePath("/api");

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
