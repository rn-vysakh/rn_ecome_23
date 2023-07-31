import { Request, Response } from "express";
import log from "../../logger/logger";
import httpRes from "../../utils/responses";
import sharp from "sharp";
import File, { fileDocument } from "../../models/files.model";
import path from "path";
import fs from "fs";
import { PaginationDefaults, securityKey } from "../../config/default";
import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: securityKey.aws_access_key_id,
  secretAccessKey: securityKey.aws_secret_access_key,
});

export const fileUpload = async (req: Request, res: Response) => {
  try {
    //@ts-ignore
    // const userId = req.user._id;
    const file: any = req.file;
    const type = req.body.type;
    const title = req.body.title;

    console.log("file", file);
    const fileBuffer = fs.readFileSync(file.path);

    let s3 = new AWS.S3();

    if (!file) {
      return res
        .status(400)
        .send(httpRes({ code: 400, message: "File Not Provided" }));
    }

    let fileData: any = {
      // userId: userId,
      type: type,
      title: title,
      url: file.filename,
      fileName: file.originalname,
    };

    let s3Params = {
      Bucket: "rookie-ninja-2023",
      Body: fileBuffer,
      Key: "files/" + file.filename,
      ContentType: file.mimetype,
      // ACL: "public-read",
    };
    s3.upload(s3Params, function (err, data) {
      //handle error
      if (err) {
        console.log("S3 -- > Error on file ", err);
      }

      //success
      if (data) {
        console.log("File Uploaded ", data.Location);
      }
    });

    let newFile = new File(fileData);
    let newFileData: any = await newFile.save().catch((err) => {
      log.error(err);
      return res
        .status(500)
        .send(httpRes({ code: 500, message: `Mongo Error : ${err.code}` }));
    });

    return res
      .status(200)
      .send(
        httpRes({ code: 200, message: "File uploaded", data: newFileData })
      );
  } catch (e: any) {
    log.error(e);
    return res.status(500).send(httpRes({ code: 500, message: e }));
  }
};

export const deleteFile = async (req: Request, res: Response) => {
  try {
    let fileId = req.query.id;
    let fileData: any = await File.findOneAndDelete({ _id: fileId })
      .lean()
      .catch((err) => {
        log.error(err);
        return res
          .status(500)
          .send(httpRes({ code: 500, message: `Mongo Error : ${err.code}` }));
      });
    if (fileData) {
      if (!fileData.url) {
        return res
          .status(404)
          .send(httpRes({ code: 404, message: "File Not found" }));
      }

      fs.unlink(
        path.join(__dirname, `../../uploads/files/${fileData.url}`),
        function (err) {
          if (err) throw err;
        }
      );

      return res
        .status(200)
        .send(httpRes({ code: 200, message: "File Delated" }));
    } else {
      return res
        .status(404)
        .send(httpRes({ code: 404, message: "File Not found" }));
    }
  } catch (e: any) {
    log.error(e);
    return res.status(500).send(httpRes({ code: 500, message: e }));
  }
};

export const getAllFile = async (req: Request, res: Response) => {
  try {
    let page: number =
      parseInt(req.query.page as string) || PaginationDefaults.page; // default page is 1
    let limit: number =
      parseInt(req.query.limit as string) || PaginationDefaults.limit; // default limit is 20
    let skip: number = (page - 1) * limit;

    let fileData: any = await File.find({ status: true })

      .limit(limit)
      .skip(skip)
      .lean()
      .catch((err) => {
        log.error(err);
        return res
          .status(500)
          .send(httpRes({ code: 500, message: `Mongo Error : ${err.code}` }));
      });
    if (fileData) {
      let totalCount: any = await File.countDocuments({ status: true })
        .exec()
        .catch((err) => {
          log.error(err);
          return res
            .status(500)
            .send(httpRes({ code: 500, message: `Mongo Error : ${err.code}` }));
        });
      let totalPages = totalCount / limit;
      totalPages = Math.ceil(totalPages);
      var hasNextPage = page < totalPages;
      let countDetails = {
        totalPages,
        limit,
        page,
        hasNextPage,
        totalCount: totalCount,
      };
      return res.status(200).send(
        httpRes({
          code: 200,
          message: "File Find Successfully",
          data: fileData,
          pagination: countDetails,
        })
      );
    } else {
      return res
        .status(401)
        .send(httpRes({ code: 401, message: "File Not Found" }));
    }
  } catch (e: any) {
    log.error(e);
    return res.status(500).send(httpRes({ code: 500, message: e }));
  }
};

export const getSingleFile = async (req: Request, res: Response) => {
  try {
    let imageId = req.query.id;
    if (!imageId) {
      return res
        .status(400)
        .send(httpRes({ code: 400, message: "Image Id is required" }));
    }

    let fileData: any = await File.findOne({ _id: imageId, status: true })
      // .populate("userId", "_id firstName lastName email")
      .lean()
      .catch((err) => {
        log.error(err);
        return res
          .status(500)
          .send(httpRes({ code: 500, message: `Mongo Error : ${err.code}` }));
      });
    if (fileData) {
      return res.status(200).send(
        httpRes({
          code: 200,
          message: "File Find Successfully",
          data: fileData,
        })
      );
    } else {
      return res
        .status(404)
        .send(httpRes({ code: 404, message: "File Not Found" }));
    }
  } catch (e: any) {
    log.error(e);
    return res.status(500).send(httpRes({ code: 500, message: e }));
  }
};
