import { Router } from "express";
import {
  addToCart,
  deleteCartItem,
  updateCartItemQuantity,
  fetchCart,
} from "../../controllers/shop/cart.controller.js";

const router = Router();

router.post("/add", addToCart);
router.get("/get/:userId", fetchCart);
router.put("/update", updateCartItemQuantity);
router.delete("/delete/:userId/:productId", deleteCartItem);

export default router;
