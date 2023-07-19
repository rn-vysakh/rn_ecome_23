import { Router } from "express";
import {
  getHomeData,
  createHomeSection,
  getHomeSections,
  getOneHomeData,
  updateHome,
  deleteHome,
} from "./homeSlider.controller";
import { createHomeSchema, editHomeSchema } from "./home.schema";
import verifyAccessToken, { isAdmin } from "../../middlewares/auth.middleware";

const homeRoutes: Router = Router();
homeRoutes.get("/", getHomeData);
homeRoutes.get("/home", getHomeSections);
homeRoutes.post(
  "/",
  verifyAccessToken,
  isAdmin,
  createHomeSchema,
  createHomeSection
);
homeRoutes.get("/:id", getOneHomeData);
homeRoutes.patch(
  "/update",
  verifyAccessToken,
  isAdmin,
  editHomeSchema,
  updateHome
);
homeRoutes.delete("/delete", verifyAccessToken, isAdmin, deleteHome);

export default homeRoutes;
