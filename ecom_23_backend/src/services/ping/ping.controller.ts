import { Request, Response } from "express";
import log from "../../logger/logger";
import httpRes from "../../utils/responses";

const serviceName = process.env.SERVICE_NAME;

export default async function ping(req: Request, res: Response) {
  try {
    return res
      .status(200)
      .send(
        httpRes({ code: 200, message: `${serviceName} is up and running` })
      );
  } catch (e: any) {
    log.error(e);
    return res
      .status(500)
      .send(httpRes({ code: 500, message: `${serviceName} is down` }));
  }
}
