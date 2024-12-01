import express from 'express';
import { handleLogin, handleRegister } from '../controllers/userController';
import { validateUserLogin, validateUserRegistration } from '../validations/userValidation';
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
export default router;