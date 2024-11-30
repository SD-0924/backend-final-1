import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User"; // Adjust the path to your User model
import { validationResult } from "express-validator";

export const registerUser = async (req: Request, res: Response): Promise<void>  => {
    
    console.log("jjjjjj");
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       res.status(400).json({ errors: errors.array() });
    }

    const { email, password, first, last,mobile_num, address} = req.body;
    console.log(req.body);
    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
       res.status(400).json({ message: "User already exists." });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = await User.create({
      email,
      password_hash: hashedPassword,
      first,
      last,
      mobile_num,
      address,
    });

    // Generate JWT token
   /* const token = jwt.sign(
      { id: newUser.id, email: newUser.email },
      process.env.JWT_SECRET!,
      { expiresIn: process.env.JWT_EXPIRATION }
    );
    console.log(token);*/

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error registering user"});
  }
};
