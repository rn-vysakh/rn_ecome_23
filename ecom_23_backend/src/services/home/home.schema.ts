import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import httpRes from "../../utils/responses";
import log from "../../logger/logger";

export function createHomeSchema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // create schema object
  const schema = Joi.object({
    type: Joi.string().required(),
    title: Joi.string(),
    products: Joi.array().items(Joi.string()),
    image: Joi.string(),
    url: Joi.string(),
    sliders: Joi.array().items(
      Joi.object({
        image: Joi.string(),
        title: Joi.string(),
        description: Joi.string(),
        url: Joi.string(),
      })
    ),
    description: Joi.string(),
    categories: Joi.array().items(Joi.string()),
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


export function editHomeSchema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // create schema object
  const schema = Joi.object({
    id: Joi.string().required(),
    type: Joi.string().required(),
    title: Joi.string(),
    products: Joi.array().items(Joi.string()),
    image: Joi.string(),
    url: Joi.string(),
    sliders: Joi.array().items(
      Joi.object({
        image: Joi.string(),
        title: Joi.string(),
        description: Joi.string(),
        url: Joi.string(),
      })
    ),
    description: Joi.string(),
    categories: Joi.array().items(Joi.string()),
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
    value.type === undefined &&
    value.title === undefined &&
    value.description === undefined &&
    value.status === undefined
  ) {
    res.status(400).send(
      httpRes({
        code: 400,
        message: `Validation error: type or title or description is required`,
      })
    );
  } else {
    // on success replace req.body with validated value and trigger next middleware function
    req.body = value;
    next();
  }
}
