import { Router } from "express";
import {
  createForm
} from "./form.controller";

import { createFormSchema } from "./form.schema";
import verifyAccessToken, { isAdmin } from "../../middlewares/auth.middleware";

const formRoutes: Router = Router();
formRoutes.post("/", createFormSchema, createForm);


export default formRoutes;
