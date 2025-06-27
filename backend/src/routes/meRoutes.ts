import { Router } from "express";
import {
  getMySavedBooks,
  saveBookToList,
  removeBookFromList,
  updateMyProfile, // Importamos a nova função
} from "../controllers/meController";
import { authMiddleware } from "../middleware/uthMiddleware";

const router = Router();

router.use(authMiddleware);

// Rotas de livros salvos
router.get("/books", getMySavedBooks);
router.post("/books", saveBookToList);
router.delete("/books/:bookId", removeBookFromList);

// PATCH /api/me/
router.patch("/", updateMyProfile);

export default router;
