import express from 'express';
import { handleLogin, handleRegister } from '../controllers/userController';
import { validateUserLogin, validateUserRegistration } from '../validations/userValidation';
import { validateRequest } from '../middlewares/validateRequest';
const router = express.Router();

router.post('/register', validateUserRegistration, validateRequest, handleRegister);
router.post('/login',validateUserLogin,validateRequest,handleLogin);
export default router;