import bcrypt from 'bcrypt';
import { createUser } from '../reposetories/userRepository';

export const registerUser = async (userData: any) => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const newUser = await createUser({
        ...userData,
        password_hash: hashedPassword,
    });
    return newUser;
};
