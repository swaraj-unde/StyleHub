import { Router } from "express";
import { addFeature, getFeature } from "../../controllers/common/feature.controller.js";

const router = Router();

router.post("/add", addFeature);
router.get("/get", getFeature);

export default router;
