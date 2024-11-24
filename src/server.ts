require("dotenv").config();
import { Sequelize } from "sequelize";

import app from "./app";
import sequelize from "./config/mySQLConf";

const sequelizeDB: Sequelize = sequelize;
const PORT = process.env.PORT || 3000;
const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD || "123456";
const DB_HOST = process.env.DB_HOST || "localhost";

const sequelizeInitial = new Sequelize("", DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
  logging: false,
});

const createDatabase = async () => {
  try {
    await sequelizeInitial.query(
      `CREATE DATABASE IF NOT EXISTS ${sequelizeDB.getDatabaseName()};`
    );
    console.log(
      `Database "${sequelizeDB.getDatabaseName()}" created or already exists.`
    );
  } catch (error) {
    console.error("Error creating database:", error);
    throw error;
  }
};

const initializeDatabase = async () => {
  try {
    await createDatabase();

    await sequelizeDB.authenticate();
    console.log("Database connection has been established successfully.");

    await sequelizeDB.sync({ alter: true });
    console.log("All models were synchronized successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

app.listen(PORT, async () => {
  await initializeDatabase();
  console.log(`Server is running on port ${PORT}`);
});

process.on("SIGINT", async () => {
  console.log("Gracefully shutting down...");
  await sequelizeDB.close();
  console.log("Database connection closed.");
  process.exit(0);
});
