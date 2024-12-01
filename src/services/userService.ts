import bcrypt from "bcrypt";
import { createUser, getUserByEmail } from "../reposetories/userRepository";

export const registerUser = async (userData: any) => {
  // Check if the email already exists
  const existingUser = await getUserByEmail(userData.email);
  if (existingUser) {
    throw new Error("Email is already registered"); // Or handle it based on your application's logic
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);
 
  const role = userData.role === "Admin" ? "Admin" : "User";

  const newUser = await createUser({
    ...userData,
    passwordHash: hashedPassword, // Save the hashed password
    role
  });
  return newUser;
};

// Verify password function
export const verifyPassword = async (email: string, plainPassword: string) => {
  // Retrieve user by email
  const user = await getUserByEmail(email);

  if (!user) {
    throw new Error("User not found");
  }

  // Compare provided password with hashed password in DB
  const isMatch = await bcrypt.compare(plainPassword, user.passwordHash);

  if (!isMatch) {
    throw new Error("Invalid password");
  }

  return user; // Return user if passwords match
};
