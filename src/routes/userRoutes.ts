import express from 'express';
import { handleRegister,testVerifyPassword } from '../controllers/userController';
import { validateUserRegistration } from '../validations/userValidation';
import { validateRequest } from '../middlewares/validateRequest';
const router = express.Router();

router.post('/register', validateUserRegistration, validateRequest, handleRegister);
router.post('/login', testVerifyPassword);
export default router;