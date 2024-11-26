require("dotenv").config();
import { Sequelize } from "sequelize";
import app from "./app";
import sequelize from "./config/mySQLConf";
import initializeDatabase from "./initializeDatabase";

const PORT = process.env.PORT || 3000;
/*const DB_USER = process.env.DB_USER || "root";
const DB_PASSWORD = process.env.DB_PASSWORD||"";
const DB_HOST = process.env.DB_HOST || "localhost";

const sequelizeInitial = new Sequelize("", DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: "mysql",
  logging: false,
});*/ //remove this comment if you want to initialize the database in your localhost  

  /*const DB_PORT= process.env.DB_PORT;
const DB_DATABASE=process.env.DB_DATABASE||"finalProj";
const DB_USER = process.env.DB_USERNAME || "root";
const DB_PASSWORD = process.env.DB_PASSWORD||"";
const DB_HOST = process.env.DB_HOST || "localhost";
console.log(DB_DATABASE);
const sequelizeInitial = new Sequelize('defaultdb', DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: 24723,
  dialect: 'mysql',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  logging: console.log,
});*///remove this comment if you want to initialize the database on Aiven but it is already initialized


const startServer = async () => {
  try {
  //  await initializeDatabase(sequelizeInitial, sequelize);

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
