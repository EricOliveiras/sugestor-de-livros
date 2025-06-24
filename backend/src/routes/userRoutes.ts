import { Router } from 'express';
// Adicione loginUser à importação
import { registerUser, loginUser } from '../controllers/userController';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser); // ADICIONE ESTA LINHA

export default router;