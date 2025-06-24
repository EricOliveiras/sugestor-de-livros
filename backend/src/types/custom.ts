import { Request } from 'express';

// Nós criamos nossa própria interface que estende a original do Express
// e adicionamos nossa propriedade.
export interface AuthenticatedRequest extends Request {
  userId?: string;
}