import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import logger from "../logger";

// Load environment variables from .env file
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE!, // Database name
  process.env.DB_USERNAME!, // Username
  process.env.DB_PASSWORD!, // Password
  {
    host: process.env.DB_HOST!, // Host
    port: parseInt(process.env.DB_PORT || "3306"), // Port
    dialect: "mysql", // Dialect
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false, // For secure Aiven connections
      },
    },
    logging:
      process.env.DB_LOGGING === "true" ? (msg) => logger.info(msg) : false, // Redirect logging to Winston
  }
);

export default sequelize;
