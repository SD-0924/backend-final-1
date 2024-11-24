import { Sequelize } from "sequelize";

const createDatabase = async (
  sequelizeInitial: Sequelize,
  databaseName: string
): Promise<void> => {
  try {
    await sequelizeInitial.query(
      `CREATE DATABASE IF NOT EXISTS ${databaseName};`
    );
    console.log(`Database "${databaseName}" created or already exists.`);
  } catch (error) {
    console.error("Error creating database:", error);
    throw error;
  }
};

export default createDatabase;
