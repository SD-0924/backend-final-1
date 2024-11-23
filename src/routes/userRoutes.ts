import express from 'express';
import { handleRegister } from '../controllers/userController';
import { validateUserRegistration } from '../validations/userValidation';

const router = express.Router();

router.post('/register', validateUserRegistration, handleRegister);

export default router;