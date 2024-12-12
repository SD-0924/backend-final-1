import User from '../models/User';

export const createUser = async (userData: any) => {
    return await User.create(userData);
};

export const getUserByEmail = async (email: string) => {
    return await User.findOne({ where: { email } }); // Retrieve the user by email
};

export const getUserById = async (id: string) => {
    return await User.findByPk(id);
  };
  
  
  export const updateUser = async (id: string, updates: any) => {
    const user = await User.update(updates, {where:{id}});
    if (!user) return null;
    return user;
  };
  
  export const deleteUser = async (id: string) => {
    const user = await User.destroy({where:{id}});
    if (!user) return false;
    return true;
  };

  export const findAllUsers = async () => {
    return await User.findAll();
  };