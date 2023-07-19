import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import httpRes from "../../utils/responses";
import log from "../../logger/logger";

export function createTagSchema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // create schema object
  const schema = Joi.object({
    title: Joi.string().required(),
    value: Joi.string(),
    unit: Joi.string(),
    label: Joi.string(),
    category: Joi.string().required(),
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

export function editTagSchema(req: Request, res: Response, next: NextFunction) {
  // create schema object
  const schema = Joi.object({
    id: Joi.string().required(),
    title: Joi.string(),
    value: Joi.string(),
    unit: Joi.string(),
    label: Joi.string(),
    status: Joi.boolean(),
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
  } else if (
    value.title === undefined &&
    value.value === undefined &&
    value.unit === undefined &&
    value.label === undefined &&
    value.status === undefined
  ) {
    res.status(400).send(
      httpRes({
        code: 400,
        message: `Validation error: title or value or unit or label is required`,
      })
    );
  } else {
    // on success replace req.body with validated value and trigger next middleware function
    req.body = value;
    next();
  }
}
