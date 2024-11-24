import express, { Application } from "express";
import authRoutes from "./routes/userRoutes";
import "./models/Associations";
import errorHandlingMiddleware from "./errorHandling";

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(authRoutes);

app.use(errorHandlingMiddleware);

app.all("*", (req, res) => {
  res.status(404).send("Request not supported");
});

export default app;
