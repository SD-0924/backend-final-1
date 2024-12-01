import express from 'express';
import { handleLogin, handleRegister, handleUpdateUser, handleDeleteUser, handleGetAllUsers, getUserByIdController } from '../controllers/userController';
import { validateUserLogin, validateUserRegistration } from '../validations/userValidation';
import { validateRequest } from '../middlewares/validateRequest';
const router = express.Router();

router.post('/register', validateUserRegistration, validateRequest, handleRegister);

router.post('/login',validateUserLogin,validateRequest,handleLogin);
router.get('/users', handleGetAllUsers);
router.get('/users/:id', getUserByIdController);
router.put('/:id', handleUpdateUser); // Update user by ID
router.delete('/:id', handleDeleteUser); // Delete user by ID
export default router;