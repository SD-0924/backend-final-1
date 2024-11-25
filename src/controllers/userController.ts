import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { registerUser, verifyPassword } from "../services/userService";

export const handleRegister = async (
  req: Request,
  res: Response
): Promise<void> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }

  try {
    const {
      email,
      first,
      last,
      password,
      confirmPassword,
      mobile_num,
      address,
    } = req.body;
    const newUser = await registerUser({
      email,
      first,
      last,
      password,
      confirmPassword,
      mobile_num,
      address,
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

export const testVerifyPassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Verify the password
    const user = await verifyPassword(email, password);

    // If successful, send the response
    res.status(200).json({ message: "Login successful", user });
  } catch (error: unknown) {
    res
      .status(401)
      .json({
        message: error instanceof Error ? error.message : "Unauthorized",
      });
  }
};
