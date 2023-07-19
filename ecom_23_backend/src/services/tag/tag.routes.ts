import { Router } from "express";
import {
  createTag,
  getAllTag,
  updateTag,
  getOneTag,
  deleteTag,
  getTagByStruct,
} from "./tag.controller";

import { createTagSchema, editTagSchema } from "./tag.schema";
import verifyAccessToken, { isAdmin } from "../../middlewares/auth.middleware";

const tagRoutes: Router = Router();
tagRoutes.post("/", verifyAccessToken, isAdmin, createTagSchema, createTag);
tagRoutes.get("/", getAllTag);
tagRoutes.get("/getbystruct", getTagByStruct);
tagRoutes.get("/single/:id", getOneTag);
tagRoutes.patch(
  "/update",
  verifyAccessToken,
  isAdmin,
  editTagSchema,
  updateTag
);
tagRoutes.delete("/delete", verifyAccessToken, isAdmin, deleteTag);

export default tagRoutes;
