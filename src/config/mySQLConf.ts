import { Sequelize } from "sequelize";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Create the Sequelize instance using environment variables
const sequelize = new Sequelize(
  process.env.DB_DATABASE || "", // Database name
  process.env.DB_USERNAME || "", // Username
  process.env.DB_PASSWORD || "", // Password
  {
    host: process.env.DB_HOST || "localhost", // Host
    port: parseInt(process.env.DB_PORT || "3306"), // Port
    dialect: "mysql", // Dialect
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false, // For secure Aiven connections
      },
    },
    logging: process.env.DB_LOGGING === "true" ? console.log : false, // Logging toggle
  }
);

export default sequelize;
