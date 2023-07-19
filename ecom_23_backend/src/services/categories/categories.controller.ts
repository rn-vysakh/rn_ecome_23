import { Request, Response } from "express";
import _ from "lodash";
import log from "../../logger/logger";
import httpRes from "../../utils/responses";
import Category, { CategoryDocument } from "../../models/categories.model";
import Product from "../../models/products.model";
import Mongoose from "mongoose";

const ObjectId = Mongoose.Types.ObjectId;

export const createCategory = async (req: Request, res: Response) => {
  try {
    let params = req.body;
    let data = params as CategoryDocument;
    //@ts-ignore
    data.userId = req.user._id;
    let newCategory = new Category(data);
    let CategoryData: any = await newCategory.save().catch((err) => {
      log.error(err);
      return res
        .status(500)
        .send(httpRes({ code: 500, message: `Mongo Error : ${err.code}` }));
    });

    return res.status(201).send(
      httpRes({
        code: 201,
        message: "Category Created Successfully",
        data: { _id: CategoryData._id },
      })
    );
  } catch (e: any) {
    log.error(e);
    return res.status(500).send(httpRes({ code: 500, message: e }));
  }
};

export const getAllCategory = async (req: Request, res: Response) => {
  try {
    console.log("getAllCategory-----------------<<<<");
    let categorySection = req.query.section;

    let findQuery: any = { status: true };
    if (categorySection) {
      findQuery = {
        categorySection: categorySection,
        status: true,
      };
    }
    let categoryData: any = await Category.find({})
      .select("_id categoryName description parentName isSubCategory ")
      // .populate("image", "-_id mdUrl")
      .lean()
      .catch((err) => {
        log.error(err);
        return res
          .status(500)
          .send(
            httpRes({ code: 500, message: `Mongo Error main -->: ${err.code}` })
          );
      });
    if (categoryData) {
      return res.status(200).send(
        httpRes({
          code: 200,
          message: "Category Find Successfully",
          data: categoryData,
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

export const getBrandWiceCategory = async (req: Request, res: Response) => {
  try {
    let brandId: string = req.query.brandId as string;

    if (!brandId)
      return res
        .status(400)
        .send(httpRes({ code: 400, message: "Brand Id is required" }));

    let brandIds = brandId.split(",");

    let brandObjId = brandIds.map((id) => new ObjectId(id));

    let findQuery: any = {
      status: true,
      brandId: { $in: brandObjId },
    };

    console.log("findQuery", findQuery);

    let categoryData: any = await Product.aggregate([
      {
        $match: findQuery,
      },
      {
        $group: {
          _id: "$categoryId",
        },
      },
      {
        $lookup: {
          from: "categories",
          localField: "_id",
          foreignField: "_id",
          as: "category",
        },
      },
      {
        $unwind: "$category",
      },
      {
        $project: {
          _id: "$category._id",
          categoryName: "$category.categoryName",
        },
      },
    ]);
    if (categoryData) {
      return res.status(200).send(
        httpRes({
          code: 200,
          message: "Category Find Successfully",
          data: categoryData,
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

export const getCategory = (req, res) => {
  try {
    function createCategories(categories, parentId = null) {
      const categoryList: any[] = [];
      let category;
      if (parentId == null) {
        category = categories.filter((cat) => cat.parentId == undefined);
      } else {
        category = categories.filter((cat) => cat.parentId == parentId);
      }

      for (let cate of category) {
        categoryList.push({
          _id: cate._id,
          name: cate.categoryName,
          parentId: cate.parentId,
          description: cate.description,
          image: cate.image,
          children: createCategories(categories, cate._id),
        });
      }

      return categoryList;
    }
    Category.find({})
      .populate("image", "-_id smUrl mdUrl hqUrl")
      .lean()
      .exec((error, categories) => {
        if (error) return res.status(400).json({ error });

        if (!categories) {
          return res
            .status(404)
            .send(httpRes({ code: 404, message: "Category Not found" }));
        }

        const categoryList = createCategories(categories);

        return res.status(200).send(
          httpRes({
            code: 200,
            message: "Category Find Successfully",
            data: categoryList,
          })
        );
      });
  } catch (e: any) {
    log.error(e);
    return res.status(500).send(httpRes({ code: 500, message: e }));
  }
};

export const getOneCategory = async (req: Request, res: Response) => {
  try {
    let categoryId = req.params.id as string;
    let categoryData: any = await Category.findOne({
      _id: categoryId,
      status: true,
    })
      // .select('_id categoryName description isSubCategory parentName ')
      .populate("image", "-_id smUrl mdUrl lgUrl hqUrl")
      .lean()
      .catch((err) => {
        log.error(err);
        return res
          .status(500)
          .send(httpRes({ code: 500, message: `Mongo Error : ${err.code}` }));
      });
    if (categoryData) {
      return res.status(200).send(
        httpRes({
          code: 200,
          message: "Category Find Successfully",
          data: categoryData,
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

export const updateCategory = async (req: Request, res: Response) => {
  try {
    let categoryId = req.body.id as string;

    let data = req.body as CategoryDocument;
    if (!data.isSubCategory) {
      data.parentId = "";
      data.parentName = "";
    }
    let categoryData: any = await Category.findOneAndUpdate(
      { _id: categoryId },
      data,
      { new: true }
    )
      .lean()
      .catch((err) => {
        log.error(err);
        return res
          .status(500)
          .send(httpRes({ code: 500, message: `Mongo Error : ${err.code}` }));
      });
    if (categoryData) {
      return res
        .status(200)
        .send(httpRes({ code: 200, message: "Category Updated Successfully" }));
    } else {
      return res
        .status(404)
        .send(httpRes({ code: 404, message: "Category not found" }));
    }
  } catch (e: any) {
    log.error(e);
    return res.status(500).send(httpRes({ code: 500, message: e }));
  }
};

// delete category
export const deleteCategory = async (req: Request, res: Response) => {
  try {
    let categoryId = req.query.id as string;
    let categoryData: any = await Category.findOneAndDelete({ _id: categoryId })
      .lean()
      .catch((err) => {
        log.error(err);
        return res
          .status(500)
          .send(httpRes({ code: 500, message: `Mongo Error : ${err.code}` }));
      });
    if (categoryData) {
      return res
        .status(200)
        .send(httpRes({ code: 200, message: "Category Deleted Successfully" }));
    } else {
      return res
        .status(404)
        .send(httpRes({ code: 404, message: "Category not found" }));
    }
  } catch (e: any) {
    log.error(e);
    return res.status(500).send(httpRes({ code: 500, message: e }));
  }
};
