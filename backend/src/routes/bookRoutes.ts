import { Hono } from "hono";
import {
  getBookSuggestion,
  rateBook,
  getFeaturedBooks,
} from "../controllers/bookController";
import { authMiddleware } from "../middleware/uthMiddleware";

const bookRoutes = new Hono();

// Aplicamos o middleware a todas as rotas de livros
bookRoutes.use("*", authMiddleware);

// GET /api/books/featured
bookRoutes.get("/featured", getFeaturedBooks);

// GET /api/books/suggestion
bookRoutes.get("/suggestion", getBookSuggestion);

// POST /api/books/:bookId/rate
bookRoutes.post("/:bookId/rate", rateBook);

export default bookRoutes;
