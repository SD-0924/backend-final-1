require("dotenv").config();

import express, { Application } from "express";
import authRoutes from "./routes/userRoutes";
import productRouts from "./routes/productRoutes";
import couponRouts from "./routes/couponRoutes";
import categoryRouts from "./routes/categoryRoutes";
import brandRoutes from "./routes/brandRoutes";
import "./models/Associations";
import errorHandlingMiddleware from "./errorHandling";
import swaggerOptions from "./utils/swagger";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(authRoutes);
app.use(productRouts);
app.use(couponRouts);
app.use(categoryRouts);
app.use(brandRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandlingMiddleware);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

app.all("*", (req, res) => {
  res.status(404).send("Request not supported");
});

export { app };
