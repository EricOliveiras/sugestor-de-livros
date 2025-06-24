import { Request, Response } from "express";
import { prisma } from "../lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    // 1. Validação de entrada
    if (!email || !password || !name) {
      return res
        .status(400)
        .json({ message: "Nome, email e senha são obrigatórios." });
    }

    // 2. Verificar se o usuário já existe no banco
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return res.status(409).json({ message: "Este email já está em uso." }); // 409 Conflict
    }

    // 3. Fazer o "hash" da senha para segurança
    // O '10' é o "custo" do hash - um valor padrão e seguro.
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Criar o novo usuário no banco de dados
    const user = await prisma.user.create({
      data: {
        email: email,
        name: name,
        password: hashedPassword, // Salva a senha criptografada
      },
    });

    // 5. Retornar uma resposta de sucesso sem a senha
    // NUNCA retorne a senha na resposta da API, mesmo a versão com hash.
    const { password: _, ...userWithoutPassword } = user;

    return res.status(201).json(userWithoutPassword); // 201 Created
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
