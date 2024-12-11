import express from "express";
import  { processOrderPayment }  from "../controllers/paymentController";

const router = express.Router();

router.post("/process-payment",  processOrderPayment );

export default router;
