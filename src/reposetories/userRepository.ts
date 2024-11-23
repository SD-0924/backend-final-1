import User from '../models/User';

export const createUser = async (userData: any) => {
    return await User.create(userData);
};
