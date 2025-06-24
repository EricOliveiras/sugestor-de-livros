import { Router } from "express";
import {
  getMySavedBooks,
  saveBookToList,
  removeBookFromList,
} from "../controllers/meController";
import { authMiddleware } from "../middleware/uthMiddleware";

const router = Router();

router.use(authMiddleware);

// GET /api/me/books
router.get("/books", getMySavedBooks);

// POST /api/me/books
router.post("/books", saveBookToList);

// ADICIONE ESTA NOVA ROTA
// O ':bookId' é um parâmetro dinâmico que receberemos na requisição
router.delete("/books/:bookId", removeBookFromList);

export default router;
