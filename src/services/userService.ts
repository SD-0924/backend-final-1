import bcrypt from "bcrypt";
import { createUser, getUserByEmail, updateUser, deleteUser,getUserById, findAllUsers } from "../reposetories/userRepository";

export const registerUser = async (userData: any) => {
  // Check if the email already exists
  const existingUser = await getUserByEmail(userData.email);
  if (existingUser) {
    throw new Error("Email is already registered"); // Or handle it based on your application's logic
  }

  const hashedPassword = await bcrypt.hash(userData.password, 10);
  const newUser = await createUser({
    ...userData,
    passwordHash: hashedPassword, // Save the hashed password
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


// Update User
export const updateUserService1 = async (id: string, updates: any) => {
    return await updateUser(id, updates);
};

interface UserUpdateInput {
    oldPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
    [key: string]: any;
  }
  
  export const updateUserService = async (id: string, updates: any) => {
    const { oldPassword, newPassword, confirmPassword, ...restUpdates } = updates;
  
    const user = await getUserById(id);
  
    if (!user) {
      throw new Error("User not found");
    }
  
    // Handle password update
    if (oldPassword || newPassword || confirmPassword) {
      if (!oldPassword || !newPassword || !confirmPassword) {
        throw new Error("All password fields are required");
      }
  
      // Verify old password
      const isPasswordValid = await bcrypt.compare(oldPassword, user.passwordHash);
      if (!isPasswordValid) {
        throw new Error("Old password is incorrect");
      }
  
      // Check if new password matches confirm password
      if (newPassword !== confirmPassword) {
        throw new Error("New password and confirm password do not match");
      }
  
      // Hash the new password and add to updates
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      restUpdates.password = hashedPassword;
    }
  
    // Update user profile with the remaining fields
    const updatedUser = await updateUser(id, restUpdates);
    if (!updatedUser) {
      throw new Error("Failed to update user");
    }
  
    return updatedUser;
  };

// Delete User
export const deleteUserService = async (id: string) => {
    return await deleteUser(id);
};

export const getUserByIdService = async (id: string) => {
    const user = await getUserById(id);
    if (!user) {
        throw new Error('User not found');
    }
    return user;
};
export const getAllUsers = async () => {
    try {
      const users = await findAllUsers();
      return users;
    } catch (error: unknown) {
      throw new Error(`Error fetching users: ${(error as Error).message}`);
    }
  };