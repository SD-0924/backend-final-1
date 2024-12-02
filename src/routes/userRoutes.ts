import express from 'express';
import { handleLogin, handleRegister, handleUpdateUser, handleDeleteUser, handleGetAllUsers, getUserByIdController, handleUpdateUseradress } from '../controllers/userController';
import { validateUserLogin, validateUserRegistration, validateUserUpdate } from '../validations/userValidation';
import { validateRequest } from '../middlewares/validateRequest';
const router = express.Router();

router.get("/login", (req, res) => {
    res.render("login");
  });
router.get("/register", (req, res) => {
    res.render("register");
  });

  router.get('/home', (req, res) => {
  
    if (req.cookies.token) {
      return res.render('home'); 
    } else {
      return res.redirect('/login'); 
    }
  });
router.post('/register', validateUserRegistration, validateRequest, handleRegister);

router.post('/login',validateUserLogin,validateRequest,handleLogin);
router.get('/users', handleGetAllUsers);
router.get('/users/:id', getUserByIdController);
router.put('users/address/:id', handleUpdateUseradress); // Update user by ID
router.put("/users/:id", validateUserUpdate, handleUpdateUser);
router.delete('/users/:id', handleDeleteUser); // Delete user by ID
export default router;