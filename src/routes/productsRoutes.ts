import express from "express";
import { getNewArrivals } from "../controllers/productsController";

const router = express.Router();

// Route for fetching new arrivals
router.get("/new-arrivals", getNewArrivals);

export default router;
