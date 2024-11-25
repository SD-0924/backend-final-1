import { Router } from "express";
import {
  addProduct,
  updateProduct,
  deleteProduct,
  getNewArrivals,
} from "../controllers/productsController";

const router = Router();

router.post("/api/products", addProduct);
router.put("/api/products/:id", updateProduct);
router.delete("/api/products/:id", deleteProduct);

// Route for fetching new arrivals
router.get("/api/products/new-arrivals", getNewArrivals);

export default router;
