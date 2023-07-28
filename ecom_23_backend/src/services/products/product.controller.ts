import { Request, Response } from "express";
import _ from "lodash";
import slugify from "slugify";
import Papa from "papaparse";
import log from "../../logger/logger";
import httpRes from "../../utils/responses";
import { PaginationDefaults } from "../../config/default";
// import Category, {CategoryDocument} from "../../models/categories.modal";
import Product, { ProductDocument } from "../../models/products.model";
import Category from "../../models/categories.model";

const getParentIds = async (categorie: string) => {
  let categoryData: any = await Category.find({ status: true })
    .select("_id categoryName parentId isSubCategory")
    .lean()
    .exec();

  if (!categoryData) {
    return [];
  }

  // The Mongoose return value is an Object, not a String, So We need to convert it to a String
  // Lodash is used to convert the Object to a String
  // Lodash documentation : https://lodash.com/docs/4.17.15#forEach
  _.forEach(categoryData, (cat: any) => {
    cat._id = cat._id.toString();
  });

  let parentIds: any = [categorie];
  let lastParentid = categorie;
  for (let j = 0; j < categoryData.length; j++) {
    for (let i = 0; i < categoryData.length; i++) {
      // console.log("parentId0", lastParentid);
      // console.log("=====", categoryData[i]._id);

      if (categoryData[i]._id == lastParentid) {
        if (categoryData[i].parentId) {
          lastParentid = categoryData[i].parentId;
          parentIds.push(lastParentid);
        }
      }
    }
  }

  return parentIds;
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    let params = req.body;
    let tempData = params;

    let parentIds = []; //= await getParentIds(tempData.categoryId);

    // for (let i = 0; i < tempData.categoryId?.length; i++) {
    //   let catIds = await getParentIds(tempData.categoryId[i]);
    //   parentIds = parentIds.concat(catIds);
    // }
    // let uniqueParentIds = _.uniq(parentIds);
    // console.log("uniq ids parentIds --->", uniqueParentIds);

    // tempData.categoryId = uniqueParentIds;
    // console.log('tempdata -->', parentIds);
    let slug = slugify(tempData.title, { lower: true });

    let productCheck = await Product.findOne({ slug: slug });
    if (productCheck) {
      return res
        .status(400)
        .send(httpRes({ code: 400, message: `Product Already Exist` }));
    }

    tempData.slug = slug;

    const sellerData = {
      //@ts-ignore
      sellerName: req.user.firstName,
      //@ts-ignore
      sellerId: req.user._id,
    };
    tempData.seller = [sellerData];
    // get last inserted product and add one to sku
    let lastProduct = await Product.find({}).sort({ sku: -1 }).limit(1);

    if (lastProduct.length > 0) {
      const sku: number = lastProduct[0].sku || 10100;

      tempData.sku = sku + 1;
    } else {
      tempData.sku = 10100;
    }

    let data = tempData as ProductDocument;
    //@ts-ignore
    data.userId = req.user._id;
    let newproduct = new Product(data);
    let productData: any = await newproduct.save();

    return res.status(201).send(
      httpRes({
        code: 200,
        message: "Product Created Successfully",
        data: { _id: productData._id },
      })
    );
  } catch (e: any) {
    log.error(e);
    return res.status(500).send(httpRes({ code: 500, message: e }));
  }
};

export const getAllProducts = async (req: Request, res: Response) => {
  try {
    let page: number =
      parseInt(req.query.page as string) || PaginationDefaults.page; // default page is 1
    let limit: number =
      parseInt(req.query.limit as string) || PaginationDefaults.limit; // default limit is 20
    let skip: number = (page - 1) * limit;
    let sort: any = req.query.sort || "-_id"; // -sign for descending order

    let catId: any = (req.query.catId as string) || null;
    let brandId: any = (req.query.brandId as string) || null;
    let tag: any = (req.query.tag as string) || null;

    let query: any = {};
    let specialSearchQuery: any = {};
    let searchQuery: any = {};
    let type: any = req.query.type; //For popular / deals of the day / new arrivals

    //Search Query
    let searchText: any = req.query.searchText; // For General Search
    if (searchText) {
      searchQuery = {
        $or: [
          {
            title: { $regex: searchText, $options: "i" },
          },
          {
            keywords: { $regex: searchText, $options: "i" },
          },
          {
            description: {
              $regex: searchText,
              $options: "i",
            },
          },
          {
            shortDescription: {
              $regex: searchText,
              $options: "i",
            },
          },
          {
            "specifications.value1": { $regex: searchText, $options: "i" },
          },
          {
            "specifications.value2": { $regex: searchText, $options: "i" },
          },
        ],
      };
    }

    //Category Query
    if (catId) {
      const catIds = catId.split(",");

      query["categoryId"] = { $in: catIds };
    }

    //Brand Query
    if (brandId) {
      const brandIds = brandId.split(",");
      query["brandId"] = { $in: brandIds };
      // query["brandId"] = brandId;
    }

    //Tag Query
    if (tag) {
      const tagIds = tag.split(",");
      query["productTag"] = { $in: tagIds };
      // query["brandId"] = brandId;
    }

    if (type == "popular") {
      sort = "-viewCount";
    }

    //Merging all Query
    let findCriteria: any = {
      ...query,
      ...searchQuery,
      ...specialSearchQuery,

      ...{ staus: true },
    };

    console.log(findCriteria);

    let productData: any = await Product.find(findCriteria)
      .select(
        "-createdAt -updatedAt -__v -userId -specifications -description -keywords -shortDescription"
      )
      .populate("image", "smUrl mdUrl -_id")
      .populate([
        {
          path: "categoryId",
          select: "categoryName parentName -_id",
        },
        {
          path: "brandId",
          select: "brandName logo",
          populate: {
            path: "logo",
            select: "smUrl mdUrl -_id",
          },
        },
      ])
      .limit(limit)
      .skip(skip)
      .sort(sort)
      .lean()
      .exec();

    if (productData) {
      let totalCount: any = await Product.countDocuments(findCriteria).exec();

      // console.log(findCriteria);
      // console.log(totalCount);

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
          message: "Products Find Successfully",
          data: productData,
          pagination: countDetails,
        })
      );
    } else {
      return res
        .status(401)
        .send(httpRes({ code: 401, message: "Produts Not found" }));
    }
  } catch (e: any) {
    log.error(e);
    return res.status(500).send(httpRes({ code: 500, message: e }));
  }
};

export const getSingleProducts = async (req: Request, res: Response) => {
  try {
    let productId = req.params.id;
    let userId = req.query?.userId;

    // if (userId) {
    let productUpdate = await Product.findOneAndUpdate(
      { _id: productId },
      { $inc: { viewCount: 1 } }
    );
    // }

    let productData: any = await Product.findOne({
      _id: productId,
    })
      .select("-__v ")
      .populate([
        {
          path: "categoryId",
          select: "categoryName parentName _id",
        },
        {
          path: "brandId",
          select: "brandName logo",
          populate: {
            path: "logo",
            select: "smUrl mdUrl -_id",
          },
        },
      ])
      .populate("image", " -__v -createdAt -updatedAt")
      .populate("file", " -__v -createdAt -updatedAt")
      .lean();

    if (productData) {
      return res.status(200).send(
        httpRes({
          code: 200,
          message: "Product Find Successfully",
          data: productData,
        })
      );
    } else {
      return res
        .status(200)
        .send(httpRes({ code: 200, data: null, message: "Produt Not found" }));
    }
  } catch (e: any) {
    log.error(e);
    return res.status(500).send(httpRes({ code: 500, message: e }));
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    let ProductId = req.body.productId as string;
    let data: any = req.body;
    let slug;

    let sellerData;

    if (data.seller) {
      sellerData = data.seller[0];
      //@ts-ignore
      sellerData.sellerName = req.user.firstName;
      //@ts-ignore
      sellerData.sellerId = req.user._id;
    }

    if (data.title) {
      slug = slugify(data.title, { lower: true });
      data.slug = slug;
    }
    // console.log("data", data);

    let imgData: any;
    let fileData: any;
    if (data.image) {
      imgData = req.body.image;
    }
    if (data.file) {
      fileData = req.body.file;
    }
    delete data.image;
    delete data.file;
    data["$push"] = { image: imgData, file: fileData };
    // console.log(data);

    let ProductData: any = await Product.findOneAndUpdate(
      { _id: ProductId },
      data,
      { new: true }
    ).lean();

    if (ProductData) {
      return res
        .status(200)
        .send(httpRes({ code: 200, message: "Product Updated Successfully" }));
    } else {
      return res
        .status(404)
        .send(httpRes({ code: 404, message: "Product not found" }));
    }
  } catch (e: any) {
    log.error(e);
    return res.status(500).send(httpRes({ code: 500, message: e }));
  }
};

export const updateProductImg = async (req: Request, res: Response) => {
  try {
    let ProductId = req.body.productId as string;
    let imgId = req.body.imgId as string;
    let type = req.body.type as string;
    let updateParams: any = {};
    if (type === "add") {
      updateParams = { $push: { image: imgId } };
    } else if (type === "remove") {
      updateParams = { $pull: { image: imgId } };
    }

    let ProductData: any = await Product.findOneAndUpdate(
      { _id: ProductId },
      updateParams,
      { new: true }
    ).lean();

    if (ProductData) {
      return res
        .status(200)
        .send(
          httpRes({ code: 200, message: "Product Image Updated Successfully" })
        );
    } else {
      return res
        .status(404)
        .send(httpRes({ code: 404, message: "Product not found" }));
    }
  } catch (e: any) {
    log.error(e);
    return res.status(500).send(httpRes({ code: 500, message: e }));
  }
};

export const updateProductFile = async (req: Request, res: Response) => {
  try {
    let ProductId = req.body.productId as string;
    let fileId = req.body.fileId as string;
    let type = req.body.type as string;
    let updateParams: any = {};
    if (type === "add") {
      updateParams = { $push: { file: fileId } };
    } else if (type === "remove") {
      updateParams = { $pull: { file: fileId } };
    }

    let ProductData: any = await Product.findOneAndUpdate(
      { _id: ProductId },
      updateParams,
      { new: true }
    ).lean();

    if (ProductData) {
      return res
        .status(200)
        .send(
          httpRes({ code: 200, message: "Product File Updated Successfully" })
        );
    } else {
      return res
        .status(404)
        .send(httpRes({ code: 404, message: "Product not found" }));
    }
  } catch (e: any) {
    log.error(e);
    return res.status(500).send(httpRes({ code: 500, message: e }));
  }
};
// Delete Product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    let productId = req.query.id as string;
    let productData: any = await Product.findOneAndDelete({
      _id: productId,
    }).lean();

    if (productData) {
      return res
        .status(200)
        .send(httpRes({ code: 200, message: "Product Deleted Successfully" }));
    } else {
      return res
        .status(404)
        .send(httpRes({ code: 404, message: "Product not found" }));
    }
  } catch (e: any) {
    log.error(e);
    return res.status(500).send(httpRes({ code: 500, message: e }));
  }
};

export const getAllProductsExcel = async (req: Request, res: Response) => {
  try {
    let sort: any = req.query.sort || "order"; // -sign for descending order
    let param: any = req.query.param || null; // For search, we can use any field
    let param2: any = req.query.param2 || null; // For greater than, less than  field
    let value: any = req.query.value; //For search value
    let gte: number = parseInt(req.query.gte as string) || 0;
    let lte: any = parseInt(req.query.lte as string) || null;
    let catId: any = (req.query.catId as string) || null;
    let brandId: any = (req.query.brandId as string) || null;
    let query: any = {};
    let specialSearchQuery: any = {};
    let searchQuery: any = {};

    //Special Search Query
    if (param && value) {
      query[param] = { $regex: value, $options: "i" };
    }

    //Less than and greater than
    if (gte && param2 && !lte) {
      specialSearchQuery[param2] = { $gte: gte };
    } else if (lte && param2 && !gte) {
      specialSearchQuery[param2] = { $lte: lte };
    } else if (gte && lte && param2) {
      specialSearchQuery[param2] = { $gte: gte, $lte: lte };
    }

    //Search Query
    let searchText: any = req.query.searchText; // For General Search
    if (searchText) {
      searchQuery = {
        $or: [
          {
            title: { $regex: searchText, $options: "i" },
          },
          {
            keywords: { $regex: searchText, $options: "i" },
          },
          {
            description: {
              $regex: searchText,
              $options: "i",
            },
          },
          {
            shortDescription: {
              $regex: searchText,
              $options: "i",
            },
          },
          {
            "specifications.value1": { $regex: searchText, $options: "i" },
          },
          {
            "specifications.value2": { $regex: searchText, $options: "i" },
          },
        ],
      };
    }

    //Category Query
    if (catId) {
      query["categoryId"] = catId;
    }

    //Brand Query
    if (brandId) {
      query["brandId"] = brandId;
    }

    //FOR Filter Queries /*/*/*/*/*/*/*/
    let filterQuery: any = {};
    let subFilterQuery;
    let subFilterQuery2 = {};
    if (req.query.ft && req.query.fv) {
      let andArr: any = [];
      let ft = req.query.ft as string;
      let fv = req.query.fv as string;

      let ftArr = ft.split(",");
      let ftArrLength = ftArr.length;
      let fvArr = fv.split("|");
      let fvArrLength = fvArr.length;
      for (let i = 0; i < ftArrLength; i++) {
        let orArr: any = [];
        let filterObjStr = `filters2.${ftArr[i]}`;
        let filterKeyStr: any;
        let valueArr = fvArr[i].split(",");
        if (valueArr.length > 3) {
          for (let j = 0; j < valueArr.length; j = j + 3) {
            orArr.push({ [filterObjStr]: valueArr[j + 1] });
          }
          andArr.push({ $or: orArr });

          // filterKeyStr = { $or: orArr }
          //   if (orArr.length > 0) {
          // andArr.push({ $or: orArr });

          //   }
        } else {
          filterKeyStr =
            valueArr[0] === "btw"
              ? { $gte: valueArr[1], $lte: valueArr[2] }
              : valueArr[1];
        }
        let filterObj = { [filterObjStr]: filterKeyStr };
        // console.log("filterObj keys---->", Object.values(filterObj));
        // console.log("f_+-=-=--@##---->", Object.values(filterObj)[0]);
        if (Object.values(filterObj)[0]) {
          andArr.push(filterObj);
          // console.log("filterObj inside if", filterObj);
        } else {
          // console.log("filterObj outside if", filterObj);
        }
      }
      if (andArr.length > 0) {
        filterQuery = { $and: andArr };
      }
    }

    let testFilterQuery = {
      $and: [
        {
          "filters2.scanType": "ADF",
        },
        {
          "filters2.dailyThroughput": { $gte: 10000, $lte: 500000 },
        },
        {
          $or: [
            { "filters2.maxPaperSize": "A3" },
            { "filters2.maxPaperSize": "A4" },
          ],
        },
      ],
    };

    //Merging all Query
    let findCriteria: any = {
      ...query,
      ...searchQuery,
      ...specialSearchQuery,
      ...filterQuery,
      ...{ staus: true },
    };

    let productData: any = await Product.find(findCriteria)
      .select(
        "-createdAt -updatedAt -__v -userId -specifications -description -keywords -shortDescription"
      )
      .populate("image", "smUrl mdUrl -_id")
      .populate([
        {
          path: "categoryId",
          select: "categoryName parentName -_id",
        },
        {
          path: "brandId",
          select: "brandName",
        },
      ])

      .sort("sort")
      .lean()
      .exec();

    if (productData) {
      let csvData = Papa.unparse(productData);
      res.setHeader("Content-Type", "text/csv");
      res.setHeader("Content-Disposition", "attachment; filename=products.csv");
      res.send(csvData);
    } else {
      return res
        .status(401)
        .send(httpRes({ code: 401, message: "Produts Not found" }));
    }
  } catch (e: any) {
    log.error(e);
    return res.status(500).send(httpRes({ code: 500, message: e }));
  }
};

export const getMultipleProducts = async (req: Request, res: Response) => {
  try {
    let productId = req.params.id;
    let productIds = productId.split(",");
    let productData: any = await Product.find({ _id: { $in: productIds } })
      .select("seller title")
      .lean();

    if (productData) {
      return res.status(200).send(
        httpRes({
          code: 200,
          message: "Product Find Successfully",
          data: productData,
        })
      );
    } else {
      return res
        .status(200)
        .send(httpRes({ code: 200, data: null, message: "Produt Not found" }));
    }
  } catch (e: any) {
    log.error(e);
    return res.status(500).send(httpRes({ code: 500, message: e }));
  }
};

// Delete this
export const insertMany = async (req: Request, res: Response) => {
  // insertManyData()
  return res.status(200).send(httpRes({ code: 200, message: "All ok" }));
};
