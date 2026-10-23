import express from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  deleteProduct,
} from "../controllers/products.controller.js";
import { verifyToken, isAdmin } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProduct);
router.post("/create", verifyToken, isAdmin, createProduct);
router.delete("/:id", verifyToken, isAdmin, deleteProduct);

export default router;