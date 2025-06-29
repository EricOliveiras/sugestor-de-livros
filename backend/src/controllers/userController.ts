import { Context } from "hono";
import { hash, compare } from "bcrypt-ts";
import { sign } from "hono/jwt";
import { prisma } from "../lib/prisma";

export const registerUser = async (c: Context) => {
  try {
    const { email, password, name } = await c.req.json();

    if (!email || !password || !name) {
      return c.json({ message: "Nome, email e senha são obrigatórios." }, 400);
    }
    if (password.length < 6) {
      return c.json(
        { message: "A senha deve ter pelo menos 6 caracteres." },
        400
      );
    }

    const allowedDomains = [
      "gmail.com",
      "outlook.com",
      "hotmail.com",
      "yahoo.com",
    ];
    const emailDomain = email.split("@")[1];

    if (!allowedDomains.includes(emailDomain)) {
      return c.json(
        {
          message:
            "Por favor, use um email de um provedor válido (Gmail, Outlook, etc.).",
        },
        400
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return c.json({ message: "Este email já está em uso." }, 409);
    }

    const hashedPassword = await hash(password, 10);
    const defaultAvatarUrl = `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(
      name || "User"
    )}`;

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        avatarUrl: defaultAvatarUrl,
      },
    });

    const { password: _, ...userWithoutPassword } = user;
    return c.json(userWithoutPassword, 201);
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    return c.json({ message: "Erro interno do servidor." }, 500);
  }
};

export const loginUser = async (c: Context) => {
  try {
    const { email, password } = await c.req.json();
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !user.password) {
      return c.json({ message: "Credenciais inválidas." }, 401);
    }

    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
      return c.json({ message: "Credenciais inválidas." }, 401);
    }

    const payload = {
      userId: user.id,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
    }; // Token expira em 7 dias
    const secret = process.env.JWT_SECRET!;
    const token = await sign(payload, secret);

    const { password: __, ...userWithoutPassword } = user;
    return c.json({ user: userWithoutPassword, token });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return c.json({ message: "Erro interno do servidor." }, 500);
  }
};
