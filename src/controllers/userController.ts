import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { registerUser } from "../services/userService";
import { verifyPassword ,updateUserService, deleteUserService, getUserByIdService, getAllUsers} from "../services/userService";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../server";

export const handleRegister = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      email,
      first,
      last,
      password,
      confirmPassword,
      mobileNum,
      address,
      role,
    } = req.body;
    const newUser = await registerUser({
      email,
      first,
      last,
      password,
      confirmPassword,
      mobileNum,
      address,
      role,
    });
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res
        .status(500)
        .json({ message: "Internal server error", error: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const handleLogin = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await verifyPassword(email, password);
    if (!user) {
       res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1h" });

    res.cookie("token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });

    if (user.role === "Admin") {
      return res.redirect("/home");
    }

    res.status(200).json({ message: "Login successful", token });
  } catch (error: unknown) {
    res.status(401).json({
      message: error instanceof Error ? error.message : "Unauthorized",
    });
  }
};


// Update User
export const handleUpdateUser = async (req: Request, res: Response): Promise<void> => {
  try {
      const { id } = req.params;
      const updates = req.body;
      const updatedUser = await updateUserService(id, updates);

      if (!updatedUser) {
          res.status(404).json({ message: 'User not found' });
          return;
      }

      res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error: unknown) {
      res.status(500).json({ message: 'Internal server error', error: error instanceof Error ? error.message : error });
  }
};

// Delete User
export const handleDeleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
      const { id } = req.params;
      const deleted = await deleteUserService(id);

      if (!deleted) {
          res.status(404).json({ message: 'User not found' });
          return;
      }

      res.status(200).json({ message: 'User deleted successfully' });
  } catch (error: unknown) {
      res.status(500).json({ message: 'Internal server error', error: error instanceof Error ? error.message : error });
  }
};
export const handleGetAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error: unknown) {
    res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
  }
};

// Get user by ID
export const getUserByIdController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await getUserByIdService(id);
    if (!user) {
       res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user', error });
  }
};
