import { Request, Response } from "express";
import log from "../../logger/logger";
import httpRes from "../../utils/responses";
import sharp from "sharp";
import Image, { imageDocument } from "../../models/image.model";
import path from "path";
import fs from "fs";
import { PaginationDefaults, securityKey } from "../../config/default";
import AWS from "aws-sdk";

AWS.config.update({
  accessKeyId: securityKey.aws_access_key_id,
  secretAccessKey: securityKey.aws_secret_access_key,
});

export const imageController = async (req: Request, res: Response) => {
  try {
    let s3 = new AWS.S3();
    // Quality factor of the image
    const imgQ: number = 75;

    //@ts-ignore
    const userId = req.user._id;
    //@ts-ignore
    const image: any = req.file;
    const type = req.body.type;

    if (!image) {
      return res
        .status(400)
        .send(httpRes({ code: 400, message: "Image requred" }));
    }

    let str = image.filename.split(".");
    let webpFileName = str[0] + ".webp";

    let s3Params: any = {};

    if (!type) {
      return res
        .status(400)
        .send(httpRes({ code: 400, message: "Type requred" }));
    }

    let folder;
    if (type === "product") {
      folder = "products/";
    } else if (type === "category") {
      folder = "categories/";
    } else if (type === "user") {
      folder = "users/";
    } else if (type === "banner") {
      folder = "banners/";
    } else if (type === "brands") {
      folder = "brands/";
    } else {
      folder = "others/";
    }

    // 300p image upload
    const imgStreamSm = await sharp(image.destination + image.filename)
      .resize(320, 320, {
        kernel: sharp.kernel.nearest,
        fit: "contain",
        position: "centre",
        background: { r: 255, g: 255, b: 255, alpha: 0 },
      })
      .webp({ quality: imgQ });

    s3Params = {
      Bucket: "rookie-ninja-2023",
      Body: imgStreamSm,
      Key: folder + "sm_300p_" + webpFileName,
      ContentType: "image/webp",
      ACL: "public-read",
    };

    s3.upload(s3Params, function (err, data) {
      //handle error
      if (err) {
        console.log("S3 -- > Error on saving sm_300 ", err);
      }

      //success
      if (data) {
        console.log("Uploaded in sm_300 :", data.Location);
      }
    });

    // 640p image upload
    const imgStreamMd = await sharp(image.destination + image.filename)
      .resize(640, 640, {
        kernel: sharp.kernel.nearest,
        fit: "contain",
        position: "centre",
        background: { r: 255, g: 255, b: 255, alpha: 0 },
      })
      .webp({ quality: imgQ });
    s3Params = {
      Bucket: "rookie-ninja-2023",
      Body: imgStreamMd,
      Key: folder + "md_640p_" + webpFileName,
      ContentType: "image/webp",
      ACL: "public-read",
    };

    s3.upload(s3Params, function (err, data) {
      //handle error
      if (err) {
        console.log("S3 -- > Error on saving md_640 ", err);
      }

      //success
      if (data) {
        console.log("Uploaded in md_640 :", data);
      }
    });

    // 1000x1000 image upload
    const imgStreamLg = await sharp(image.destination + image.filename)
      .resize(1000, 1000, {
        kernel: sharp.kernel.nearest,
        fit: "contain",
        position: "centre",
        background: { r: 255, g: 255, b: 255, alpha: 0 },
      })
      .webp({ quality: imgQ });

    s3Params = {
      Bucket: "rookie-ninja-2023",
      Body: imgStreamLg,
      Key: folder + "lg_1000p_" + webpFileName,
      ContentType: "image/webp",
      ACL: "public-read",
    };

    s3.upload(s3Params, function (err, data) {
      //handle error
      if (err) {
        console.log("S3 -- > Error on saving lg_1000 ", err);
      }

      //success
      // if (data) {
      //   console.log("Uploaded in lg_1000 :", data.Location);
      // }
    });

    // 1080p image upload

    const imgStreamHq = await sharp(image.destination + image.filename)
      .resize(1920, 1080, {
        kernel: sharp.kernel.nearest,
        fit: "contain",
        position: "centre",
        background: { r: 255, g: 255, b: 255, alpha: 0 },
      })
      .webp({ quality: imgQ });

    s3Params = {
      Bucket: "rookie-ninja-2023",
      Body: imgStreamHq,
      Key: folder + "hq_1080p_" + webpFileName,
      ContentType: "image/webp",
      ACL: "public-read",
    };

    s3.upload(s3Params, function (err, data) {
      //handle error
      if (err) {
        console.log("S3 hq_1080-- > Error on saving hq_1080", err);
      }

      //success
      // if (data) {
      //   console.log("Uploaded hq_1080 :", data.Location);
      // }
    });

    // Orginal image upload

    const imgStreamOq = await sharp(image.destination + image.filename).webp({
      quality: imgQ,
    });

    s3Params = {
      Bucket: "rookie-ninja-2023",
      Body: imgStreamOq,
      Key: folder + webpFileName,
      ContentType: "image/webp",
      ACL: "public-read",
    };

    s3.upload(s3Params, function (err, data) {
      //handle error
      if (err) {
        console.log("S3 Orginal-- > Error on saving hq_1080", err);
      }

      //success
      if (data) {
        console.log("Uploaded Orginal :", data.Location);
      }
    });

    let imgData: any = {
      userId: userId,
      type: type,
      smUrl: "sm_300p_" + webpFileName,
      mdUrl: "md_640p_" + webpFileName,
      lgUrl: "lg_1000p_" + webpFileName,
      hqUrl: "hg_1080p_" + webpFileName,
      ogUrl: image.filename,
    };

    let newImg = new Image(imgData);
    let newImgData: any = await newImg.save().catch((err) => {
      log.error(err);
      return res
        .status(500)
        .send(httpRes({ code: 500, message: `Mongo Error : ${err.code}` }));
    });

    // fs.unlink(
    //   path.join(__dirname, `../../uploads/images/${image.filename}`),
    //   function (err) {
    //     if (err) throw err;
    //   }
    // );

    return res
      .status(200)
      .send(
        httpRes({ code: 200, message: "image uploaded", data: newImgData })
      );
  } catch (e: any) {
    log.error(e);
    return res.status(500).send(httpRes({ code: 500, message: e }));
  }
};

export const deleteImage = async (req: Request, res: Response) => {
  try {
    let imageId = req.query.id;
    let imageData: any = await Image.findOneAndDelete({ _id: imageId })
      .lean()
      .catch((err) => {
        log.error(err);
        return res
          .status(500)
          .send(httpRes({ code: 500, message: `Mongo Error : ${err.code}` }));
      });
    if (imageData) {
      if (!imageData.ogUrl) {
        return res
          .status(404)
          .send(httpRes({ code: 404, message: "Image Not found" }));
      }
      fs.unlink(
        path.join(__dirname, `../../uploads/images/${imageData.ogUrl}`),
        function (err) {
          if (err) throw err;
        }
      );
      fs.unlink(
        path.join(__dirname, `../../uploads/images/${imageData.smUrl}`),
        function (err) {
          if (err) throw err;
        }
      );
      fs.unlink(
        path.join(__dirname, `../../uploads/images/${imageData.mdUrl}`),
        function (err) {
          if (err) throw err;
        }
      );
      fs.unlink(
        path.join(__dirname, `../../uploads/images/${imageData.lgUrl}`),
        function (err) {
          if (err) throw err;
        }
      );
      fs.unlink(
        path.join(__dirname, `../../uploads/images/${imageData.hqUrl}`),
        function (err) {
          if (err) throw err;
          log.info("file deleted successfully");
        }
      );
      return res
        .status(200)
        .send(httpRes({ code: 200, message: "Image Delated" }));
    } else {
      return res
        .status(404)
        .send(httpRes({ code: 404, message: "Image Not found" }));
    }
  } catch (e: any) {
    log.error(e);
    return res.status(500).send(httpRes({ code: 500, message: e }));
  }
};

export const getAllImage = async (req: Request, res: Response) => {
  try {
    let page: number =
      parseInt(req.query.page as string) || PaginationDefaults.page; // default page is 1
    let limit: number =
      parseInt(req.query.limit as string) || PaginationDefaults.limit; // default limit is 20
    let skip: number = (page - 1) * limit;

    let imageData: any = await Image.find({ status: true })
      .select("_id type mdUrl smUrl")
      .populate("userId", "_id name email")
      .limit(limit)
      .skip(skip)
      .lean()
      .catch((err) => {
        log.error(err);
        return res
          .status(500)
          .send(httpRes({ code: 500, message: `Mongo Error : ${err.code}` }));
      });
    if (imageData) {
      let totalCount: any = await Image.countDocuments({ status: true })
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
          message: "Image Find Successfully",
          data: imageData,
          pagination: countDetails,
        })
      );
    } else {
      return res
        .status(401)
        .send(httpRes({ code: 401, message: "Image Not Found" }));
    }
  } catch (e: any) {
    log.error(e);
    return res.status(500).send(httpRes({ code: 500, message: e }));
  }
};

export const getSingleImage = async (req: Request, res: Response) => {
  try {
    let imageId = req.query.id;
    if (!imageId) {
      return res
        .status(400)
        .send(httpRes({ code: 400, message: "Image Id is required" }));
    }

    let imageData: any = await Image.findOne({ _id: imageId, status: true })
      .populate("userId", "_id firstName lastName email")
      .lean()
      .catch((err) => {
        log.error(err);
        return res
          .status(500)
          .send(httpRes({ code: 500, message: `Mongo Error : ${err.code}` }));
      });
    if (imageData) {
      return res.status(200).send(
        httpRes({
          code: 200,
          message: "Image Find Successfully",
          data: imageData,
        })
      );
    } else {
      return res
        .status(404)
        .send(httpRes({ code: 404, message: "Image Not Found" }));
    }
  } catch (e: any) {
    log.error(e);
    return res.status(500).send(httpRes({ code: 500, message: e }));
  }
};
