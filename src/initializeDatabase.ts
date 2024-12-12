import { Sequelize } from "sequelize";
import createDatabase from "./createDatabase";
import logger from "./logger";

const initializeDatabase = async (
  sequelizeInitial: Sequelize,
  sequelizeDB: Sequelize
): Promise<void> => {
  try {
    await createDatabase(sequelizeInitial, sequelizeDB.getDatabaseName());

    await sequelizeDB.authenticate();
    logger.info("Database connection has been established successfully.");

    await sequelizeDB.sync({ alter: true });
    logger.info("All models were synchronized successfully.");
  } catch (error) {
    logger.error("Unable to connect to the database:", error);
    throw error;
  }
};

export default initializeDatabase;
