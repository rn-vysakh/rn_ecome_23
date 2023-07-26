import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { CategoryDocument } from "./categories.model";
import { BrandDocument } from "./brand.model";
import { string } from "joi";

export interface ProductDocument extends mongoose.Document {
  userId: UserDocument["_id"];
  categoryId: CategoryDocument["_id"];
  brandId: BrandDocument["_id"];
  title: string;
  slug: string;
  partNumber: string;
  sku: number;
  price: number;
  oldPrice: number;
  partNo: string;
  dimension: string;
  weight: string;
  warrenty: string;
  upc: string;
  ean: string;
  shortDescription: string;
  shortPoints: [string];
  description: string;
  specifications: string;
  productTag: [string];
  seller: [
    {
      sellerName: string;
      sellerId: UserDocument["_id"];
      price: number;
      sellPrice: number;
      qty: number;
      status: boolean;
      warrenty: string;
      conditions: string;
    }
  ];
  image?: [string];
  file?: [string];
  qty: number;
  filters?: [
    {
      title: string;
      value: string;
    }
  ];
  salesSection: {
    type: string;
    // enum: ["new", "sale", "top_selling", "trending", "top_rated", "dod"];
    default: "new";
  };
  status?: boolean;
  keywords?: [string];
  seoDesc: string;
  order?: number;
  viewCount?: number;
  saleCount?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const ProductSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Categories" },
    brandId: { type: mongoose.Schema.Types.ObjectId, ref: "Brand" },
    title: { type: String, required: true },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    partNumber: String,
    sku: { type: Number, required: true },
    sellingPrice: { type: Number },
    oldPrice: { type: Number },
    shortDescription: { type: String },
    shortPoints: [String],
    description: { type: String },
    specifications: { type: String },
    partNo: String,
    dimension: String,
    weight: String,
    warrenty: String,
    upc: String,
    ean: String,
    image: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image" }],
    file: [{ type: mongoose.Schema.Types.ObjectId, ref: "File" }],
    qty: { type: Number },
    salesSection: {
      type: String,
      // enum: ["new", "sale", "top_selling", "trending", "top_rated", "dod"],
      default: "new",
    },
    filters: [
      {
        title: String,
        value: String,
      },
    ],

    totalSales: {
      type: Number,
      default: 0,
    },
    productTag: [String],
    keywords: [String],
    order: { type: Number, default: 0 },
    viewCount: { type: Number, default: 0 },
    saleCount: { type: Number, default: 0 },
    status: { type: Boolean, default: true },
    seoDesc: { type: String },
    seller: [
      {
        sellerName: String,
        sellerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        price: Number,
        sellPrice: Number,
        qty: Number,
        status: Boolean,
        warrenty: String,
        conditions: String,
      },
    ],
  },
  { timestamps: true }
);

const Product = mongoose.model<ProductDocument>("Products", ProductSchema);

export default Product;
