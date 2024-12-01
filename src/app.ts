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
import path from "path";
import cookieParser from 'cookie-parser';

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const app: Application = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));  

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(authRoutes);
app.use(productRouts);
app.use(couponRouts);
app.use(categoryRouts);
app.use(brandRoutes);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandlingMiddleware);

app.all("*", (req, res) => {
  res.status(404).send("Request not supported");
});

export default app;
