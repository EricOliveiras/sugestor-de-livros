import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import userRoutes from "./routes/userRoutes";
import bookRoutes from "./routes/bookRoutes";
import meRoutes from "./routes/meRoutes";

const app = new Hono().basePath("/api");

app.use(
  "*",
  cors({
    origin: ["https://oraculo-literario.vercel.app", "http://localhost:5173"], // Lembre-se que para o teste local, o frontend estará em localhost
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

app.get("/", (c) => {
  return c.text("API do Oráculo Literário está no ar!");
});

// A linha 'export default' é o que a Cloudflare/Wrangler vai usar.
export default app;

// 2. ESTE BLOCO SÓ RODA QUANDO EXECUTAMOS O ARQUIVO LOCALMENTE COM `npm run dev`
const port = Number(process.env.PORT) || 3001;
console.log(`Servidor de desenvolvimento rodando em http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port: port,
});
