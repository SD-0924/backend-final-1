import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { registerUser } from '../services/userService';
import { verifyPassword } from '../services/userService';
import jwt from "jsonwebtoken";
import { JWT_SECRET } from '../server';
import User from '../models/User';

export const handleRegister = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, first, last, password,confirmPassword, mobile_num, address } = req.body;
        const newUser = await registerUser({ email, first, last, password,confirmPassword, mobile_num, address });
        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({ message: 'Internal server error', error: error.message });
        } else {
            res.status(500).json({ message: 'An unknown error occurred' });
        }
    }
};

export const handleLogin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Verify the password
        const user = await verifyPassword(email, password);
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        // If successful, send the response
        res.status(200).json({ message: "Login successful", token });
    } catch (error: unknown) {
        res.status(401).json({ message: error instanceof Error ? error.message : "Unauthorized" });
    }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
      const users = await User.findAll(); // Fetch all users
      res.status(200).json(users); // Return the users in JSON format
  } catch (error: unknown) {
      if (error instanceof Error) {
          res.status(500).json({ message: 'Internal server error', error: error.message });
      } else {
          res.status(500).json({ message: 'An unknown error occurred' });
      }
  }
};
