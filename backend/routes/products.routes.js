import express from "express";
import allController from "../controller/products.controller.js";

const productRouter = express.Router();

const { fetchProducts, addProducts, deleteProducts, updateProducts } =
  allController;


productRouter.get("/", fetchProducts);
productRouter.post("/add", addProducts);
productRouter.delete("/delete/:id", deleteProducts);
productRouter.put("/update/:id", updateProducts);

export default productRouter;
