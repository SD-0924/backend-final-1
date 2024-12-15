import { Sequelize } from "sequelize";
import logger from "./logger";

const createDatabase = async (sequelize: Sequelize, dbName: string) => {
  try {
    await sequelize.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
    logger.info(`Database "${dbName}" is ready.`);
  } catch (error) {
    logger.error("Error creating database:", error);
    throw error;
  }
};

export default createDatabase;
