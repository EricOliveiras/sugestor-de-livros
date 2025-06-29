import { Context } from 'hono';
import { prisma } from '../lib/prisma';
import { hash, compare } from 'bcrypt-ts';
import { sign } from 'hono/jwt';

export const registerUser = async (c: Context) => {
  const prisma = c.get('prisma');
  try {
    const { email, password, name } = await c.req.json();
    console.log(`[REGISTER ATTEMPT] Tentando registrar com email: ${email}`);

    // Validação de entrada básica
    if (!email || !password || !name) {
      console.log('[VALIDATION FAIL] Campos obrigatórios faltando.');
      return c.json({ message: 'Nome, email e senha são obrigatórios.' }, 400);
    }

    // Validação de senha
    if (password.length < 6) {
      console.log('[VALIDATION FAIL] Senha muito curta.');
      return c.json({ message: 'A senha deve ter pelo menos 6 caracteres.' }, 400);
    }

    // Validação de domínio de email
    const allowedDomains = ['gmail.com', 'outlook.com', 'hotmail.com', 'yahoo.com', 'icloud.com'];
    const emailDomain = email.split('@')[1];
    
    if (!allowedDomains.includes(emailDomain)) {
      console.log(`[VALIDATION FAIL] Domínio de email não permitido: ${emailDomain}`);
      return c.json({ message: 'Por favor, use um email de um provedor válido (Gmail, Outlook, etc.).' }, 400);
    }

    // Validação de usuário existente
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      console.log(`[VALIDATION FAIL] Email já existe: ${email}`);
      return c.json({ message: 'Este email já está em uso.' }, 409);
    }

    console.log('[VALIDATION PASS] Todas as validações passaram. Criando usuário...');
    const hashedPassword = await hash(password, 10);
    const defaultAvatarUrl = `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(name || 'User')}`;

    const user = await prisma.user.create({
      data: { email, name, password: hashedPassword, avatarUrl: defaultAvatarUrl },
    });
    console.log(`[SUCCESS] Usuário criado com sucesso: ${user.id}`);

    const { password: _, ...userWithoutPassword } = user;
    return c.json(userWithoutPassword, 201);
  } catch (error) {
    console.error("Erro fatal ao registrar usuário:", error);
    return c.json({ message: 'Erro interno do servidor.' }, 500);
  }
};

export const loginUser = async (c: Context) => {
  const prisma = c.get('prisma');
  try {
    const { email, password } = await c.req.json();
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return c.json({ message: 'Credenciais inválidas.' }, 401);
    }

    const isPasswordValid = await compare(password, user.password!);
    if (!isPasswordValid) {
      return c.json({ message: 'Credenciais inválidas.' }, 401);
    }
    
    const payload = { userId: user.id, exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * 7) }; // Token expira em 7 dias
    const secret = process.env.JWT_SECRET!;
    const token = await sign(payload, secret);

    const { password: __, ...userWithoutPassword } = user;
    return c.json({ user: userWithoutPassword, token });
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    return c.json({ message: 'Erro interno do servidor.' }, 500);
  }
};