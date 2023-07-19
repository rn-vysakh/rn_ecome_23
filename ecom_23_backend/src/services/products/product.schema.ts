import { NextFunction, Request, Response } from "express";
import Joi from "joi";
import httpRes from "../../utils/responses";
import log from "../../logger/logger";
import _ from "lodash";

export function createProductSchema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // create schema object
  const schema = Joi.object({
    categoryId: Joi.string(),
    brandId: Joi.string(),
    title: Joi.string(),
    partNumber: Joi.string(),
    shortDescription: Joi.string(),
    description: Joi.string(),
    specifications: Joi.string(),
    filters: Joi.object(),
    image: Joi.array().items(Joi.string()),
    file: Joi.array().items(Joi.string()),
    qty: Joi.number(),
    oldPrice: Joi.number(),
    sellingPrice: Joi.number(),
    status: Joi.boolean(),
    keywords: Joi.array().items(Joi.string()),
    productTag: Joi.array().items(Joi.string()),
    seller: Joi.array().items(
      Joi.object({
        // sellerName: Joi.string(),
        // sellerId: Joi.string(),
        price: Joi.number(),
        sellPrice: Joi.number(),
        qty: Joi.number(),
        status: Joi.boolean(),
        warrenty: Joi.string(),
        conditions: Joi.string(),
      })
    ),

    seoDesc: Joi.string(),
    order: Joi.number(),
    salesSection: Joi.string(),
    partNo: Joi.string(),
    dimension: Joi.string(),
    weight: Joi.string(),
    warrenty: Joi.string(),
    upc: Joi.string(),
    ean: Joi.string(),
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

export function updateProductSchema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // create schema object
  const schema = Joi.object({
    productId: Joi.string(),
    categoryId: Joi.string(),
    brandId: Joi.string(),
    title: Joi.string(),
    partNumber: Joi.string(),
    shortDescription: Joi.string(),
    description: Joi.string(),
    specifications: Joi.string(),
    filters: Joi.array(),
    image: Joi.array().items(Joi.string()),
    file: Joi.array().items(Joi.string()),
    qty: Joi.number(),
    oldPrice: Joi.number(),
    sellingPrice: Joi.number(),
    status: Joi.boolean(),
    keywords: Joi.array().items(Joi.string()),
    productTag: Joi.array().items(Joi.string()),
    seoDesc: Joi.string(),
    order: Joi.number(),
    salesSection: Joi.string(),
    seller: Joi.array().items(
      Joi.object({
        // sellerName: Joi.string(),fggf
        // sellerId: Joi.string(),
        price: Joi.number(),
        sellPrice: Joi.number(),
        qty: Joi.number(),
        status: Joi.boolean(),
        warrenty: Joi.string(),
        conditions: Joi.string(),
      })
    ),
    partNo: Joi.string(),
    dimension: Joi.string(),
    weight: Joi.string(),
    warrenty: Joi.string(),
    upc: Joi.string(),
    ean: Joi.string(),
  });

  // schema options
  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
  };

  // validate request body against schema
  const { error, value } = schema.validate(req.body, options);

  let productIsEmpty = _.isEmpty(_.omit(req.body, ["productId"]));

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
  } else if (productIsEmpty) {
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

export function updateProductImgSchema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // create schema object
  const schema = Joi.object({
    productId: Joi.string(),
    imgId: Joi.string(),
    type: Joi.string().valid("add", "remove"),
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

export function updateProductFileSchema(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // create schema object
  const schema = Joi.object({
    productId: Joi.string(),
    fileId: Joi.string(),
    type: Joi.string().valid("add", "remove"),
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
