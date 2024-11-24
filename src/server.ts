require("dotenv").config();
import { Sequelize } from "sequelize";
import app from "./app";
import sequelize from "./config/mySQLConf";
import initializeDatabase from "./initializeDatabase";

const PORT = process.env.PORT || 3000;
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST || "localhost";

const sequelizeInitial = new Sequelize("", DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
  logging: false,
});

const startServer = async () => {
  try {
    await initializeDatabase(sequelizeInitial, sequelize);

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting server:", error);
    process.exit(1);
  }

  process.on("SIGINT", async () => {
    console.log("Gracefully shutting down...");
    await sequelize.close();
    console.log("Database connection closed.");
    process.exit(0);
  });
};

startServer();
