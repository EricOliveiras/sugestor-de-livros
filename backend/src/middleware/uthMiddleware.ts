import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "../types/custom";
import jwt from "jsonwebtoken";

interface TokenPayload {
  userId: string;
  iat: number;
  exp: number;
}

export const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Token não fornecido." });
  }

  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer" || !token) {
    return res.status(401).json({ message: "Token mal formatado." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    const { userId } = decoded as TokenPayload;
    req.userId = userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido." });
  }
};
