import { Router } from "express";
import {
  getBookSuggestion,
  getFeaturedBooks,
  rateBook,
} from "../controllers/bookController";
import { authMiddleware } from "../middleware/uthMiddleware";

const router = Router();

router.get("/featured", authMiddleware, getFeaturedBooks);

router.get("/suggestion", authMiddleware, getBookSuggestion);

router.post("/:bookId/rate", authMiddleware, rateBook);

export default router;
