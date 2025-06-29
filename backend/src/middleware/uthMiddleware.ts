import { Context, Next } from "hono";
import { verify } from "hono/jwt";

export const authMiddleware = async (c: Context, next: Next) => {
  const authHeader = c.req.header("authorization");

  if (!authHeader) {
    return c.json({ message: "Token não fornecido." }, 401);
  }

  const [bearer, token] = authHeader.split(" ");

  if (bearer !== "Bearer" || !token) {
    return c.json({ message: "Token mal formatado." }, 401);
  }

  try {
    const secret = process.env.JWT_SECRET!;
    const decodedPayload = await verify(token, secret);

    // Em vez de req.userId, definimos uma variável no contexto do Hono
    c.set("userId", decodedPayload.userId);

    // Passa para a próxima função
    await next();
  } catch (error) {
    return c.json({ message: "Token inválido ou expirado." }, 401);
  }
};
