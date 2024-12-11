import { ERROR_MESSAGES } from "../constants/errorMessages";
import { STATUS_CODES } from "../constants/statusCodes";
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { registerUser } from "../services/userService";
import {
  verifyPassword,
  updateUserService,
  deleteUserService,
  getUserByIdService,
  getAllUsers,
  updateUserService1,
} from "../services/userService";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../server";

export const handleRegister = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, first, last, password } = req.body;
    const newUser = await registerUser({
      email,
      first,
      last,
      password,
    });
    res
      .status(STATUS_CODES.CREATED)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res
        .status(STATUS_CODES.SERVER_ERROR)
        .json({ message: ERROR_MESSAGES.SERVER_ERROR, error: error.message });
    } else {
      res
        .status(STATUS_CODES.SERVER_ERROR)
        .json({ message: "An unknown error occurred" });
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

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(STATUS_CODES.SUCCESS).json({
      message: "Login successful",
      id: user.id,
      token,
      firstName: user.first,
      lastName: user.last,
    });
  } catch (error: unknown) {
    res.status(401).json({
      message: error instanceof Error ? error.message : "Unauthorized",
    });
  }
};

// Update User
export const handleUpdateUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const { oldPassword, newPassword, confirmPassword, ...updates } = req.body;

    const updatedUser = await updateUserService(id, {
      oldPassword,
      newPassword,
      confirmPassword,
      ...updates,
    });

    res
      .status(STATUS_CODES.SUCCESS)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error: unknown) {
    if (error instanceof Error) {
      const statusCode =
        error.message === ERROR_MESSAGES.USER_NOT_FOUND ||
        error.message === "Old password is incorrect" ||
        error.message === "All password fields are required" ||
        error.message === "New password and confirm password do not match"
          ? STATUS_CODES.BAD_REQUEST
          : STATUS_CODES.SERVER_ERROR;
      res.status(statusCode).json({ message: error.message });
    } else {
      res
        .status(STATUS_CODES.SERVER_ERROR)
        .json({ message: ERROR_MESSAGES.SERVER_ERROR });
    }
  }
};

export const handleUpdateUseradress = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;

    const { street, state, city, pincode, mobileNum } = req.body;
    const updates: { address?: string; mobileNum?: string } = {};

    // Construct the address object if all fields are provided
    if (street || state || city || pincode) {
      updates.address = [street, state, city, pincode]
        .filter(Boolean)
        .join(" ");
    }

    // Add the mobileNumber if provided
    if (mobileNum) {
      updates.mobileNum = mobileNum;
    }
    console.log(updates);
    const updatedUser = await updateUserService1(id, updates);

    if (!updatedUser) {
      res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
      return;
    }

    res
      .status(STATUS_CODES.SUCCESS)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : error,
    });
  }
};

// Delete User
export const handleDeleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const deleted = await deleteUserService(id);

    if (!deleted) {
      res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
      return;
    }

    res
      .status(STATUS_CODES.SUCCESS)
      .json({ message: "User deleted successfully" });
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: "Internal server error",
      error: error instanceof Error ? error.message : error,
    });
  }
};
export const handleGetAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await getAllUsers();
    res.status(STATUS_CODES.SUCCESS).json(users);
  } catch (error: unknown) {
    res.status(STATUS_CODES.SERVER_ERROR).json({
      message: "Internal server error",
      error: (error as Error).message,
    });
  }
};

// Get user by ID
export const getUserByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await getUserByIdService(id);
    if (!user) {
      res
        .status(STATUS_CODES.NOT_FOUND)
        .json({ message: ERROR_MESSAGES.USER_NOT_FOUND });
    }
    res.status(STATUS_CODES.SUCCESS).json(user);
  } catch (error) {
    res
      .status(STATUS_CODES.SERVER_ERROR)
      .json({ message: "Failed to fetch user", error });
  }
};
