import express, { Application, NextFunction } from "express";
import logger from "./logger";
import authRoutes from "./routes/userRoutes";
import productRouts from "./routes/productRoutes";
import cartRouts from "./routes/cartItemRoutes";
import couponRouts from "./routes/couponRoutes";
import categoryRouts from "./routes/categoryRoutes";
import errorHandlingMiddleware from "./errorHandling";
import swaggerOptions from "./utils/swagger";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";
import cookieParser from "cookie-parser";
import brandRouter from "./routes/brandRoutes";
import descountRouter from "./routes/discountRouter";
import orderRouter from "./routes/orderRoutes";
import orderItemRouter from "./routes/orderItemRoutes";
import cors from "cors";
import ratingRouter from "./routes/ratingRoutes";
import payRouter from "./routes/paymentRoutes";
import { STATUS_CODES } from "./constants/statusCodes";

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const app: Application = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Allow specific origin
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware to log all requests
app.use((req, res, next: NextFunction) => {
  logger.info(`HTTP ${req.method} ${req.url}`);
  next();
});

app.use(authRoutes);
app.use(productRouts);
app.use(couponRouts);
app.use(categoryRouts);
app.use(descountRouter);
app.use(brandRouter);
app.use(cartRouts);
app.use(ratingRouter);
app.use(orderRouter);
app.use(orderItemRouter);
app.use(payRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandlingMiddleware);

app.get("/health", (req, res) => {
  res.status(STATUS_CODES.SUCCESS).json({ status: "OK" });
});

app.all("*", (req, res) => {
  res.status(STATUS_CODES.NOT_FOUND).send("Request not supported");
});

export default app;
