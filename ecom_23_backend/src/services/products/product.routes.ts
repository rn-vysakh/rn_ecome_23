import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getSingleProducts,
  updateProduct,
  updateProductImg,
  updateProductFile,
  deleteProduct,
  insertMany,
  getAllProductsExcel,
  getMultipleProducts,
} from "./product.controller";
import {
  createProductSchema,
  updateProductSchema,
  updateProductImgSchema,
  updateProductFileSchema,
} from "./product.schema";
import verifyAccessToken, { isAdmin } from "../../middlewares/auth.middleware";

const productRoutes: Router = Router();
productRoutes.post(
  "/",
  verifyAccessToken,
  isAdmin,
  createProductSchema,
  createProduct
);
productRoutes.get("/", getAllProducts);
productRoutes.get("/:id", getSingleProducts);
productRoutes.patch(
  "/",
  verifyAccessToken,
  isAdmin,
  updateProductSchema,
  updateProduct
);
productRoutes.patch(
  "/updateimg",
  verifyAccessToken,
  isAdmin,
  updateProductImgSchema,
  updateProductImg
);
productRoutes.patch(
  "/updatefile",
  verifyAccessToken,
  isAdmin,
  updateProductFileSchema,
  updateProductFile
);
productRoutes.delete("/delete", verifyAccessToken, isAdmin, deleteProduct);
productRoutes.get(
  "/report",
  // verifyAccessToken, isAdmin,
  getAllProductsExcel
);

productRoutes.get("/multi/:id", getMultipleProducts);
// productRoutes.put("/insertmany",  insertMany);

export default productRoutes;
