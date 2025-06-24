import { Router } from "express";
import { getBookSuggestion } from "../controllers/bookController";
import { authMiddleware } from "../middleware/uthMiddleware";

const router = Router();

router.get("/suggestion", authMiddleware, getBookSuggestion);

export default router;
