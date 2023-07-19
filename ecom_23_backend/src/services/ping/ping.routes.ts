import { Express, NextFunction, Request, Response, Router } from "express";
import pingController from "./ping.controller";
import verifyAccessToken from "../../middlewares/auth.middleware";

const pingRoutes: Router = Router();
pingRoutes.get("/", pingController);

export default pingRoutes;
