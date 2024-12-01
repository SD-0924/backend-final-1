import { Sequelize } from 'sequelize';

const createDatabase = async (sequelize: Sequelize, dbName: string) => {
  try {
    await sequelize.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    console.log(`Database "${dbName}" is ready.`);
  } catch (error) {
    console.error("Error creating database:", error);
    throw error;
  }
};

export default createDatabase;
