console.log("Hello, TypeScript!");
import express from "express";
import dotenv from "dotenv";
import sequelize from "./config/mySQLConf";
import authRoutes from "./routes/userRoutes";

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
sequelize.sync({ force: false }).then(() => {
  console.log("Database connected and tables synchronized");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});


