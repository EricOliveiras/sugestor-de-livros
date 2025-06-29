import { MiddlewareHandler, Next } from "hono";
import { verify } from "hono/jwt";

export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const authHeader = c.req.header("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ message: "Não autorizado." }, 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const secret = c.env.JWT_SECRET as string; // ou uma constante
    const payload = await verify(token, secret) as { userId: string };
    c.set("userId", payload.userId);
    await next();
  } catch (err) {
    console.error("Token inválido:", err);
    return c.json({ message: "Token inválido ou expirado." }, 401);
  }
};
