import { Router } from "express";
import {
  imageController,
  deleteImage,
  getAllImage,
  getSingleImage,
} from "./image.controller";
import verifyAccessToken, { isAdmin } from "../../middlewares/auth.middleware";
import imageUpload from "../../middlewares/imageUpload.middleware";

const imageRoutes: Router = Router();
imageRoutes.post(
  "/upload",
  verifyAccessToken,
  isAdmin,
  imageUpload,
  imageController
);
imageRoutes.delete("/remove", verifyAccessToken, isAdmin, deleteImage);
imageRoutes.get("/getall", verifyAccessToken, isAdmin, getAllImage);
imageRoutes.get("/single", isAdmin, getSingleImage);

export default imageRoutes;
