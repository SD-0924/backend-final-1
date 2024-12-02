import { Sequelize } from "sequelize";
import createDatabase from "./createDatabase";

const initializeDatabase = async (
  sequelizeInitial: Sequelize,  
  sequelizeDB: Sequelize  
): Promise<void> => {
  try {
    await createDatabase(sequelizeInitial, sequelizeDB.getDatabaseName());

    await sequelizeDB.authenticate();
    console.log("Database connection has been established successfully.");

    await sequelizeDB.sync({ alter: true });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    throw error;
  }
};

export default initializeDatabase;
