import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import httpRes from "../utils/responses";
import { securityKey } from "../config/default";
import log from "../logger/logger";
import { lowerFirst } from "lodash";

//to check the access token
const verifyAccessToken = async (req: Request, res: Response, next: any) => {
  let token = req.headers["x-access-token"] as string; // custom header name
  if (token == undefined) {
    return res
      .status(401)
      .send(httpRes({ code: 401, message: "No Token provided" }));
  }

  jwt.verify(
    token,
    securityKey.privateKey as string,
    async (err: any, decoded: any) => {
      if (err) {
        return res
          .status(401)
          .send(httpRes({ code: 401, message: "Invalid Token" }));
      }

      // @ts-ignore
      req.user = decoded;
      next();
    }
  );
};

export default verifyAccessToken;

export const isAdmin = async (req: Request, res: Response, next: any) => {
  // @ts-ignore
  let userData = req.user;
  if (userData.role == "admin" || userData.role == "super_admin") {
    next();
  } else {
    return res.status(401).send(
      httpRes({
        code: 401,
        message: "Unauthorized - You dont have access to this api",
      })
    );
  }
};
