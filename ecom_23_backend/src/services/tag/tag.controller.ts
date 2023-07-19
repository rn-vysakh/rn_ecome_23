import { Request, Response } from "express";
import _ from "lodash";
import log from "../../logger/logger";
import httpRes from "../../utils/responses";
import Tag, { TagDocument } from "../../models/tag.model";
import Mongoose from "mongoose";

const ObjectId = Mongoose.Types.ObjectId;

export const createTag = async (req: Request, res: Response) => {
  try {
    let params = req.body;
    let data = params as TagDocument;
    //@ts-ignore
    data.userId = req.user._id;
    let newTag = new Tag(data);
    let TagData: any = await newTag.save().catch((err) => {
      log.error(err);
      return res
        .status(500)
        .send(httpRes({ code: 500, message: `Mongo Error : ${err.code}` }));
    });

    return res.status(201).send(
      httpRes({
        code: 201,
        message: "Tag Created Successfully",
        data: { _id: TagData._id },
      })
    );
  } catch (e: any) {
    log.error(e);
    return res.status(500).send(httpRes({ code: 500, message: e }));
  }
};

export const getAllTag = async (req: Request, res: Response) => {
  try {
    console.log("getAllTag-----------------<<<<");
    let tagCategory = req.query.category;

    let findQuery: any = { status: true };
    if (tagCategory) {
      findQuery = {
        category: tagCategory,
        status: true,
      };
    }
    let tagData: any = await Tag.find(findQuery)
      .select("_id title value unit label")
      .populate("category", "-_id categoryName")
      .lean()
      .catch((err) => {
        log.error(err);
        return res
          .status(500)
          .send(
            httpRes({ code: 500, message: `Mongo Error main -->: ${err.code}` })
          );
      });
    if (tagData) {
      return res.status(200).send(
        httpRes({
          code: 200,
          message: "Tag Find Successfully",
          data: tagData,
        })
      );
    } else {
      return res
        .status(404)
        .send(httpRes({ code: 404, message: "Tag Not found" }));
    }
  } catch (e: any) {
    log.error(e);
    return res.status(500).send(httpRes({ code: 500, message: e }));
  }
};

export const getTagByStruct = async (req: Request, res: Response) => {
  try {
    console.log("getAllTag-----------------<<<<");
    let tagCategory = req.query.category as string;

    let findQuery: any = { status: true };

    if (tagCategory) {
      let catIds = tagCategory.split(",");

      let catObjId = catIds.map((id) => new ObjectId(id));

      findQuery = {
        status: true,
        category: { $in: catObjId },
      };
    }

    console.log("findQuery", findQuery);

    let tagData: any = await Tag.aggregate([
      {
        $match: findQuery,
      },
      {
        $group: {
          _id: "$title",
          // label: { $push: "$label" },
          value: {
            $push: {
              value: "$value",
              _id: "$_id",
            },
          },
          unit: { $first: "$unit" },
        },
      },
      {
        $sort: {
          _id: 1,
        },
      },
    ]);

    if (tagData) {
      return res.status(200).send(
        httpRes({
          code: 200,
          message: "Tag Find Successfully",
          data: tagData,
        })
      );
    } else {
      return res
        .status(404)
        .send(httpRes({ code: 404, message: "Tag Not found" }));
    }
  } catch (e: any) {
    log.error(e);
    return res.status(500).send(httpRes({ code: 500, message: e }));
  }
};

export const getOneTag = async (req: Request, res: Response) => {
  try {
    let tagId = req.params.id as string;
    let tagData: any = await Tag.findOne({
      _id: tagId,
      status: true,
    })
      .select("_id title value unit label ")
      .populate("category")
      .lean()
      .catch((err) => {
        log.error(err);
        return res
          .status(500)
          .send(httpRes({ code: 500, message: `Mongo Error : ${err.code}` }));
      });
    if (tagData) {
      return res.status(200).send(
        httpRes({
          code: 200,
          message: "Tag Find Successfully",
          data: tagData,
        })
      );
    } else {
      return res
        .status(404)
        .send(httpRes({ code: 404, message: "Tag Not found" }));
    }
  } catch (e: any) {
    log.error(e);
    return res.status(500).send(httpRes({ code: 500, message: e }));
  }
};

export const updateTag = async (req: Request, res: Response) => {
  try {
    let tagId = req.body.id as string;

    let data = req.body as TagDocument;
    // if (!data.isSubCategory) {
    //   data.parentId = "";
    //   data.parentName = "";
    // }
    let tagData: any = await Tag.findOneAndUpdate({ _id: tagId }, data, {
      new: true,
    })
      .lean()
      .catch((err) => {
        log.error(err);
        return res
          .status(500)
          .send(httpRes({ code: 500, message: `Mongo Error : ${err.code}` }));
      });
    if (tagData) {
      return res
        .status(200)
        .send(httpRes({ code: 200, message: "Tag Updated Successfully" }));
    } else {
      return res
        .status(404)
        .send(httpRes({ code: 404, message: "Tag not found" }));
    }
  } catch (e: any) {
    log.error(e);
    return res.status(500).send(httpRes({ code: 500, message: e }));
  }
};

// delete tag
export const deleteTag = async (req: Request, res: Response) => {
  try {
    let tagId = req.query.id as string;
    let tagData: any = await Tag.findOneAndDelete({ _id: tagId })
      .lean()
      .catch((err) => {
        log.error(err);
        return res
          .status(500)
          .send(httpRes({ code: 500, message: `Mongo Error : ${err.code}` }));
      });
    if (tagData) {
      return res
        .status(200)
        .send(httpRes({ code: 200, message: "Tag Deleted Successfully" }));
    } else {
      return res
        .status(404)
        .send(httpRes({ code: 404, message: "Tag not found" }));
    }
  } catch (e: any) {
    log.error(e);
    return res.status(500).send(httpRes({ code: 500, message: e }));
  }
};
