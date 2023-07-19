import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import httpRes from "../../utils/responses";
import log from "../../logger/logger";
import { join } from "path/posix";
import _ from "lodash";

export function createBrandSchema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // create schema object
  const schema = Joi.object({
    brandName: Joi.string().required(),
    brandDesc: Joi.string(),
    logo: Joi.string(),
  });

  // schema options
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  // validate request body against schema
  const { error, value } = schema.validate(req.body, options);

  if (error) {
    // on fail return comma separated errors
    // next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    res.status(400).send(
      httpRes({
        code: 400,
        message: `Validation error: ${error.details
          .map((x) => x.message)
          .join(", ")}`,
      })
    );
  } else {
    // on success replace req.body with validated value and trigger next middleware function
    req.body = value;
    next();
  }
}

export function editBrandSchema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // create schema object
  const schema = Joi.object({
    brandId: Joi.string().required(),
    brandName: Joi.string().required(),
    brandDesc: Joi.string(),
    logo: Joi.string(),
  });

  // schema options
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  // validate request body against schema
  const { error, value } = schema.validate(req.body, options);

  let addressIsEmpty = _.isEmpty(_.omit(req.body, ["addressId"]));

  if (error) {
    // on fail return comma separated errors
    // next(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    res.status(400).send(
      httpRes({
        code: 400,
        message: `Validation error: ${error.details
          .map((x) => x.message)
          .join(", ")}`,
      })
    );
  } else if (addressIsEmpty) {
    res.status(400).send(
      httpRes({
        code: 400,
        message: `Validation error: Require any parameters to update the product`,
      })
    );
  } else {
    // on success replace req.body with validated value and trigger next middleware function
    req.body = value;
    next();
  }
}
