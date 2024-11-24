// require("dotenv").config();

import express, { Application, Request, Response, NextFunction } from "express";
import authRoutes from "./routes/userRoutes";
import "./models/Associations";

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(authRoutes);

app.use((err: any, req: Request, res: Response, next: any) => {
  if (err) {
    if (err.name === "JsonWebTokenError") {
      res.status(401).json({ message: "Invalid token." });
    }

    if (err.name === "TokenExpiredError") {
      res.status(401).json({ message: "Token expired." });
    }
  }

  res.status(500).send(err.message);

  next(err);
});

app.all("*", (req, res) => {
  res.status(404).send("Request not supported");
});

export default app;
