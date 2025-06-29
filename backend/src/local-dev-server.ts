import { serve } from "@hono/node-server";
import app from "./server"; // Importamos nossa aplicação Hono 'pura'

const port = Number(process.env.PORT) || 3001;

console.log(`Servidor de desenvolvimento rodando em http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port: port,
});
