import { Router } from "express";
import {
  handleImageUpload,
  addProduct,
  deleteProduct,
  editProduct,
  fetchAllProducts,
} from "../../controllers/admin/products.controller.js";
import { upload } from "../../utils/cloudinary.js";

const router = Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);
router.post("/add", addProduct);
router.put("/edit/:id", editProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/get", fetchAllProducts);

export default router;
