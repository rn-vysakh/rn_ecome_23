import { Request, Response } from "express";
import _ from "lodash";
import slugify from "slugify";
import log from "../../logger/logger";
import httpRes from "../../utils/responses";
import Product from "../../models/products.model";
import Brand, { BrandDocument } from "../../models/brand.model";
import Mongoose from "mongoose";

const ObjectId = Mongoose.Types.ObjectId;

export const createBrand = async (req: Request, res: Response) => {
  try {
    let params = req.body;
    let data = params as BrandDocument;
    //@ts-ignore
    data.userId = req.user._id;
    let brandName = data.brandName;
    let slug = slugify(brandName, { lower: true });
    let brand = await Brand.findOne({ slug });
    if (brand) {
      return res
        .status(400)
        .send(httpRes({ code: 400, message: `Brand Already Exist` }));
    }
    data.slug = slug;
    let newBrand = new Brand(data);
    let brandData: any = await newBrand.save().catch((err) => {
      log.error(err);
      return res
        .status(500)
        .send(httpRes({ code: 500, message: `Mongo Error : ${err.code}` }));
    });

    return res.status(201).send(
      httpRes({
        code: 201,
        message: "Brand Created Successfully",
        data: { _id: brandData._id },
      })
    );
  } catch (e: any) {
    log.error(e);
    return res.status(500).send(httpRes({ code: 500, message: e }));
  }
};

export const getAllBrand = async (req: Request, res: Response) => {
  try {
    let brandData: any = await Brand.find({ status: true })
      .populate("logo", "mdUrl -_id ")
      .lean()
      .catch((err) => {
        log.error(err);
        return res
          .status(500)
          .send(httpRes({ code: 500, message: `Mongo Error : ${err}` }));
      });
    if (brandData) {
      return res.status(200).send(
        httpRes({
          code: 200,
          message: "Brand Find Successfully",
          data: brandData,
        })
      );
    } else {
      return res
        .status(404)
        .send(httpRes({ code: 404, message: "Brand Not found" }));
    }
  } catch (e: any) {
    log.error(e);
    return res.status(500).send(httpRes({ code: 500, message: e }));
  }
};

export const getCategoryWice = async (req: Request, res: Response) => {
  try {
    let catId: string = req.query.catId as string;

    if (!catId)
      return res
        .status(400)
        .send(httpRes({ code: 400, message: "Brand Id is required" }));

    let catIds = catId.split(",");

    let catObjId = catIds.map((id) => new ObjectId(id));

    let findQuery: any = {
      status: true,
      categoryId: { $in: catObjId },
    };

    console.log("findQuery", findQuery);

    let barndData: any = await Product.aggregate([
      {
        $match: findQuery,
      },
      {
        $group: {
          _id: "$brandId",
        },
      },
      {
        $lookup: {
          from: "brands",
          localField: "_id",
          foreignField: "_id",
          as: "brand",
        },
      },
      {
        $unwind: "$brand",
      },
      {
        $project: {
          _id: "$brand._id",
          categoryName: "$brand.brandName",
        },
      },
    ]);
    if (barndData) {
      return res.status(200).send(
        httpRes({
          code: 200,
          message: "Barnd Find Successfully",
          data: barndData,
        })
      );
    } else {
      return res
        .status(404)
        .send(httpRes({ code: 404, message: "Category Not found" }));
    }
  } catch (e: any) {
    log.error(e);
    return res.status(500).send(httpRes({ code: 500, message: e }));
  }
};

export const updateBrand = async (req: Request, res: Response) => {
  try {
    let brandId = req.body.brandId as string;
    let brandName = req.body.brandName as string;

    // let slug = slugify(brandName, { lower: true });
    let updateData = req.body;

    // updateData.slug = slug;
    let brandData: any = await Brand.findOneAndUpdate(
      { _id: brandId },
      updateData,
      { new: true }
    )
      .lean()
      .catch((err) => {
        log.error(err);
        return res
          .status(500)
          .send(httpRes({ code: 500, message: `Mongo Error : ${err.code}` }));
      });
    if (brandData) {
      return res
        .status(200)
        .send(httpRes({ code: 200, message: "Brand Updated Successfully" }));
    } else {
      return res
        .status(404)
        .send(httpRes({ code: 404, message: "Brand not found" }));
    }
  } catch (e: any) {
    log.error(e);
    return res.status(500).send(httpRes({ code: 500, message: e }));
  }
};

export const deleteBrand = async (req: Request, res: Response) => {
  try {
    let addressId = req.query.id as string;
    let brandData: any = await Brand.findOneAndDelete({
      _id: addressId,
    }).catch((err) => {
      log.error(err);
      return res
        .status(500)
        .send(httpRes({ code: 500, message: `Mongo Error : ${err.code}` }));
    });
    if (brandData) {
      return res
        .status(200)
        .send(httpRes({ code: 200, message: "Brand Deleted Successfully" }));
    } else {
      return res
        .status(404)
        .send(httpRes({ code: 404, message: "Brand not found" }));
    }
  } catch (e: any) {
    log.error(e);
    return res.status(500).send(httpRes({ code: 500, message: e }));
  }
};
