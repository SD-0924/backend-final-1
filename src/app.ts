import express, { Application } from "express";
import authRoutes from "./routes/userRoutes";
import productRouts from "./routes/productRoutes";
import brandRoutes from "./routes/brandRoutes";
import "./models/Associations";
import errorHandlingMiddleware from "./errorHandling";

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(authRoutes);
app.use(productRouts);
app.use(brandRoutes);

app.use(errorHandlingMiddleware);

app.all("*", (req, res) => {
  res.status(404).send("Request not supported");
});

export default app;
