import { Router } from "express";
import {
  fileUpload,
  deleteFile,
  getAllFile,
  getSingleFile,
} from "./file.controller";
import verifyAccessToken from "../../middlewares/auth.middleware";
import upload from "../../middlewares/fileUpload.middleware";

const imageRoutes: Router = Router();
imageRoutes.post("/upload", upload, fileUpload);
imageRoutes.delete("/remove", verifyAccessToken, deleteFile);
imageRoutes.get("/getall", verifyAccessToken, getAllFile);
imageRoutes.get("/single", getSingleFile);

export default imageRoutes;
