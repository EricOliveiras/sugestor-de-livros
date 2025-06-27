import { Router } from "express";
import { getBookSuggestion, rateBook } from "../controllers/bookController";
import { authMiddleware } from "../middleware/uthMiddleware";

const router = Router();

router.get("/suggestion", authMiddleware, getBookSuggestion);

router.post("/:bookId/rate", authMiddleware, rateBook);

export default router;
