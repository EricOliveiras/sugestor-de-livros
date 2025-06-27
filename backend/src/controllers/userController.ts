import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
  try {
    // 1. NÃO esperamos mais o avatarUrl vindo do frontend
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ message: "Nome, email e senha são obrigatórios." });
    }

    const allowedDomains = [
      "gmail.com",
      "outlook.com",
      "hotmail.com",
      "yahoo.com",
    ];
    const emailDomain = email.split("@")[1];

    if (!allowedDomains.includes(emailDomain)) {
      return res.status(400).json({
        message:
          "Por favor, use um email de um provedor válido (Gmail, Outlook, etc.).",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return res.status(409).json({ message: "Este email já está em uso." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 2. GERAMOS A URL DO AVATAR PADRÃO AQUI
    // Usamos o nome do usuário como "semente" para o avatar
    const defaultAvatarUrl = `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(
      name || "User"
    )}`;

    // 3. Criar o novo usuário, agora com o avatarUrl padrão
    const user = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: hashedPassword,
        avatarUrl: defaultAvatarUrl, // Salva a URL do avatar padrão
      },
    });

    const { password: _, ...userWithoutPassword } = user;
    return res.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error("Erro ao registrar usuário:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // a. Validação de entrada
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email e senha são obrigatórios." });
    }

    // b. Encontrar o usuário no banco de dados
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      // Usamos uma mensagem genérica para não informar se o email existe ou não
      return res.status(401).json({ message: "Credenciais inválidas." }); // 401 Unauthorized
    }

    // c. Comparar a senha enviada com a senha hasheada no banco
    const isPasswordValid = await bcrypt.compare(password, user.password!);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Credenciais inválidas." });
    }

    // d. Gerar o Token JWT se a senha for válida
    const token = jwt.sign(
      { userId: user.id }, // O "payload" - dados que queremos guardar no token
      process.env.JWT_SECRET!, // O nosso segredo do .env
      { expiresIn: "1d" } // Opções, como o tempo de expiração do token (1 dia)
    );

    // e. Enviar o token (e os dados do usuário sem a senha) de volta
    const { password: _, ...userWithoutPassword } = user;

    return res.status(200).json({ user: userWithoutPassword, token });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return res.status(500).json({ message: "Erro interno do servidor." });
  }
};
