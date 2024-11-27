import express from 'express';
import { handleLogin, handleRegister,getAllUsers } from '../controllers/userController';
import { validateUserLogin, validateUserRegistration } from '../validations/userValidation';
import { validateRequest } from '../middlewares/validateRequest';
const router = express.Router();

router.post('/register', validateUserRegistration, validateRequest, handleRegister);

router.post('/login',validateUserLogin,validateRequest,handleLogin);
router.get('/users', getAllUsers);
export default router;