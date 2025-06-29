import { Hono } from 'hono';
import { registerUser, loginUser } from '../controllers/userController';

const router = new Hono();

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;