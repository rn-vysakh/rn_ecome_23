import { Request, Response } from "express";
import _ from "lodash";
import log from "../../logger/logger";
import httpRes from "../../utils/responses";
import Product, { ProductDocument } from "../../models/products.model";
import Category from "../../models/categories.model";
import Home, { HomeDocument } from "../../models/home.model";

//old one
export const getHomeData = async (req: Request, res: Response) => {
  try {
    let findCriteria = {
      status: true,
      salesSection: {
        $in: ["new", "sale", "top_selling", "trending", "top_rated", "dod"],
      },
    };
    let ProductData: any = await Product.find(findCriteria)
      .select("name sellingPrice oldPrice image salesSection onlyForDisplay")
      .populate("image", "smUrl mdUrl")
      .lean()
      .sort({ createdAt: -1 })
      .catch((err) => {
        log.error(err);
        return res
          .status(500)
          .send(httpRes({ code: 500, message: `Mongo Error : ${err.code}` }));
      });

    let categories = await Category.find({ status: true })
      .lean()
      .catch((err) => {
        log.error(err);
        return res
          .status(500)
          .send(httpRes({ code: 500, message: `Mongo Error : ${err.code}` }));
      });

    let topSelling = _.filter(ProductData, { salesSection: "top_selling" });
    let trending = _.filter(ProductData, { salesSection: "trending" });
    let topRated = _.filter(ProductData, { salesSection: "top_rated" });
    let recentlyAdded = _.filter(ProductData, { salesSection: "new" });
    let sale = _.filter(ProductData, { salesSection: "sale" });
    let dod = _.filter(ProductData, { salesSection: "dod" });

    let HomeSlider = [
      {
        title: "Top Selling",
        subTitle: "Best Selling Products",
        toLink: "/products/top-selling",
        lgImg:
          "https://www.jdmedia.co.za/images/carousel/Ecommerce-Banner-1920.jpg",
        mobImg:
          "https://www.jdmedia.co.za/images/carousel/Ecommerce-Banner-1920.jpg",
      },
    ];

    // TODO: Add Slider data and other data to the response
    let homePageData = {
      topText: "Welcome to our store",
      topTextLink: "https://rookie-ninja.com",
      dod: dod,
      topSelling: topSelling,
      trending: trending,
      recentlyAdded: recentlyAdded,
      topRated: topRated,
      sale: sale,
    };
    return res.status(200).send(
      httpRes({
        code: 200,
        message: "Home Data Successfully Fetch",
        data: homePageData,
      })
    );
  } catch (e: any) {
    log.error(e);
    return res.status(500).send(httpRes({ code: 500, message: e }));
  }
};

export const createHomeSection = async (req: Request, res: Response) => {
  try {
    let params = req.body;
    let data = params as HomeDocument;
    //@ts-ignore
    data.userId = req.user._id;
    let newData = new Home(data);
    let HomeData: any = await newData.save().catch((err) => {
      log.error(err);
      return res
        .status(500)
        .send(httpRes({ code: 500, message: `Mongo Error : ${err.code}` }));
    });

    return res.status(201).send(
      httpRes({
        code: 201,
        message: "Tag Created Successfully",
        data: HomeData,
      })
    );
  } catch (e: any) {
    log.error(e);
    return res.status(500).send(httpRes({ code: 500, message: e }));
  }
};

export const getHomeSections = async (req: Request, res: Response) => {
  try {
    let HomeData: any = await Home.find()
      .populate({
        path: "products",
        select: "_id title seller image",
        populate: {
          path: "image",
          select: "-_id smUrl",
        },
        model: Product,
      })
      // .populate("image")
      // .populate("slider.image")
      .lean()
      .catch((err) => {
        log.error(err);
        return res
          .status(500)
          .send(httpRes({ code: 500, message: `Mongo Error : ${err.code}` }));
      });

    return res.status(200).send(
      httpRes({
        code: 200,
        message: "Successfully get home data",
        data: HomeData,
      })
    );
  } catch (e: any) {
    log.error(e);
    return res.status(500).send(httpRes({ code: 500, message: e }));
  }
};

export const getOneHomeData = async (req: Request, res: Response) => {
  try {
    let homeId = req.params.id as string;
    let homeData: any = await Home.findOne({
      _id: homeId,
      status: true,
    })
      // .select('_id categoryName description isSubCategory parentName ')
      .populate({
        path: "products",
        select: "_id title seller image",
        populate: {
          path: "image",
          select: "-_id smUrl",
        },
        model: Product,
      })
      .lean()
      .catch((err) => {
        log.error(err);
        return res
          .status(500)
          .send(httpRes({ code: 500, message: `Mongo Error : ${err.code}` }));
      });
    if (homeData) {
      return res.status(200).send(
        httpRes({
          code: 200,
          message: "Home data Find Successfully",
          data: homeData,
        })
      );
    } else {
      return res
        .status(404)
        .send(httpRes({ code: 404, message: "Home data Not found" }));
    }
  } catch (e: any) {
    log.error(e);
    return res.status(500).send(httpRes({ code: 500, message: e }));
  }
};

export const updateHome = async (req: Request, res: Response) => {
  try {
    let homeId = req.body.id as string;
    console.log(req.body);
    let data = req.body as HomeDocument;
    // if (!data.isSubCategory) {
    //   data.parentId = "";
    //   data.parentName = "";
    // }
    console.log("home data=============>",data);
    let homeData: any = await Home.findOneAndUpdate({ _id: homeId }, data, {
      new: true,
    })
      .lean()
      .catch((err) => {
        log.error(err);
        return res
          .status(500)
          .send(httpRes({ code: 500, message: `Mongo Error : ${err.code}` }));
      });
      console.log("home data new=============>",homeData);
    if (homeData) {
      return res
        .status(200)
        .send(httpRes({ code: 200, message: "Home Updated Successfully" }));
    } else {
      return res
        .status(404)
        .send(httpRes({ code: 404, message: "Home not found" }));
    }
  } catch (e: any) {
    log.error(e);
    return res.status(500).send(httpRes({ code: 500, message: e }));
  }
};

// delete Home
export const deleteHome = async (req: Request, res: Response) => {
  try {
    let homeId = req.query.id as string;
    let homeData: any = await Home.findOneAndDelete({ _id: homeId })
      .lean()
      .catch((err) => {
        log.error(err);
        return res
          .status(500)
          .send(httpRes({ code: 500, message: `Mongo Error : ${err.code}` }));
      });
    if (homeData) {
      return res
        .status(200)
        .send(httpRes({ code: 200, message: "Home Deleted Successfully" }));
    } else {
      return res
        .status(404)
        .send(httpRes({ code: 404, message: "Home not found" }));
    }
  } catch (e: any) {
    log.error(e);
    return res.status(500).send(httpRes({ code: 500, message: e }));
  }
};
