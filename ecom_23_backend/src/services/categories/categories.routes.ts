import { Router } from "express";
import {
  createCategory,
  getAllCategory,
  updateCategory,
  getOneCategory,
  deleteCategory,
  getCategory,
  getBrandWiceCategory,
} from "./categories.controller";
import { createCategorySchema, editCategorySchema } from "./categories.schema";
import verifyAccessToken, { isAdmin } from "../../middlewares/auth.middleware";

const categoryRoutes: Router = Router();
categoryRoutes.post(
  "/",
  verifyAccessToken,
  isAdmin,
  createCategorySchema,
  createCategory
);
categoryRoutes.get("/", getAllCategory);
categoryRoutes.get("/getbybrand", getBrandWiceCategory);
categoryRoutes.get("/getbystruct", getCategory);
categoryRoutes.get("/:id", getOneCategory);
categoryRoutes.patch(
  "/update",
  verifyAccessToken,
  isAdmin,
  editCategorySchema,
  updateCategory
);
categoryRoutes.delete("/delete", verifyAccessToken, isAdmin, deleteCategory);

export default categoryRoutes;
