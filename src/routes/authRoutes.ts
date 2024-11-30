import express from "express";
import { registerUser } from "../controllers/authController";
import { registerValidation } from "../validations/authValidation";

const router = express.Router();

// User Registration Route
router.post("/register", registerValidation, registerUser);

export default router;
