import dotenv from "dotenv";
import app from "./app";
import sequelize from "./config/mySQLConf";
import initializeDatabase from "./initializeDatabase";

dotenv.config();

const PORT = process.env.PORT || 3000;
export const JWT_SECRET = process.env.JWT_SECRET!;
const environment = process.env.NODE_ENV || "development";
import logger from "./logger";

const startServer = async () => {
  try {
    await initializeDatabase(sequelize, sequelize);

    if (environment.toString().trim() !== "test") {
      app.listen(PORT, () => {
        logger.info(`Server is running on port ${PORT}`);
        logger.info("API Docs available at http://localhost:3000/api-docs");
      });
    }
  } catch (error) {
    logger.error("Error starting server:", error);
    process.exit(1);
  }

  process.on("SIGINT", async () => {
    logger.info("Gracefully shutting down...");
    await sequelize.close();
    logger.info("Database connection closed.");
    process.exit(0);
  });
};

environment.toString().trim() !== "test" && startServer();
