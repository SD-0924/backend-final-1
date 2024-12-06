import express from 'express';

import { handleLogin, handleRegister, handleUpdateUser, handleDeleteUser, handleGetAllUsers, getUserByIdController, handleUpdateUseradress } from '../controllers/userController';
import { validateUserLogin, validateUserRegistration, validateUserUpdate } from '../validations/userValidation';
import { authenticateJWT } from '../middlewares/authMiddleware';
import { validateRequest } from '../middlewares/validateRequest';
const router = express.Router();


router.post('/register', validateUserRegistration, validateRequest, handleRegister);

router.post('/login', validateUserLogin, validateRequest, handleLogin);
router.get('/users', 
    //authenticateJWT, 
    handleGetAllUsers);
router.get('/users/:id', authenticateJWT, getUserByIdController);
router.put('users/address/:id',authenticateJWT, handleUpdateUseradress); // Update user by ID
router.put("/users/:id",authenticateJWT, validateUserUpdate, handleUpdateUser);
router.delete('/:id', authenticateJWT, handleDeleteUser); // Delete user by ID

export default router;
