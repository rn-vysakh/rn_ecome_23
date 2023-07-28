import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import httpRes from "../../utils/responses";
import log from "../../logger/logger";

export function createCategorySchema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // create schema object
  const schema = Joi.object({
    categoryName: Joi.string().required(),
    description: Joi.string(),
    order: Joi.number(),
    image: Joi.string(),
    parentId: Joi.string(),
    parentName: Joi.string(),
    categorySection: Joi.string(),
    isSubCategory: Joi.boolean().default(false),
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

export function editCategorySchema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // create schema object
  const schema = Joi.object({
    id: Joi.string().required(),
    categoryName: Joi.string(),
    description: Joi.string(),
    order: Joi.number(),
    parentId: Joi.string(),
    categorySection: Joi.string(),

    isSubCategory: Joi.boolean().default(false),
    parentName: Joi.string(),
    image: Joi.string(),
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
    value.categoryName === undefined &&
    value.discription === undefined &&
    value.status === undefined
  ) {
    res.status(400).send(
      httpRes({
        code: 400,
        message: `Validation error: categoryName or discription is required`,
      })
    );
  } else {
    // on success replace req.body with validated value and trigger next middleware function
    req.body = value;
    next();
  }
}
