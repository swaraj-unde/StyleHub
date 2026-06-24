import { Router } from "express";
import {
  createOrder,
  capturePayment,
  getAllOrders,
  getOrderDetails,
} from "../../controllers/shop/order-controller.js";

const router = Router();

router.post("/create", createOrder);
router.post("/capture", capturePayment);
router.get("/list/:userId", getAllOrders);
router.get("/details/:orderId", getOrderDetails);

export default router;
