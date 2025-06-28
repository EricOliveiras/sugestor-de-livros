import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bookRoutes from "./routes/bookRoutes";
import userRoutes from "./routes/userRoutes";
import meRoutes from "./routes/meRoutes";

console.log("--- server.ts foi carregado ---"); // DIAGNÓSTICO

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

const corsOptions = {
  // Substitua pela URL exata do seu site no Vercel
  origin: "https://oraculo-literario.vercel.app",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE", // Métodos permitidos
  allowedHeaders: "Content-Type,Authorization", // Headers permitidos
};

app.use(cors(corsOptions));
app.use(express.json());

// Rotas da API
app.use("/api/books", bookRoutes);
app.use("/api/users", userRoutes);
app.use("/api/me", meRoutes);

app.get("/", (req, res) => {
  res.send("API do Sugestor de Livros está no ar!");
});

app.listen(port, () => {
  console.log(`🚀 Servidor rodando na porta ${port}`);
});
