import dotenv from "dotenv";
import app from "./app";
import sequelize from "./config/mySQLConf";  
import initializeDatabase from "./initializeDatabase";


dotenv.config();

const PORT = process.env.PORT || 3000;
export const JWT_SECRET = process.env.JWT_SECRET!;


const startServer = async () => {
  try {
  
    await initializeDatabase(sequelize, sequelize);

  
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log("API Docs available at http://localhost:3000/api-docs");
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
