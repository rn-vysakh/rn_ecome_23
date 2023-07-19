import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface BrandDocument extends mongoose.Document {
  userId: UserDocument["_id"];
  brandName: string;
  slug: string;
  brandDesc: string;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const BrandSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    brandName: { type: String, required: true },
    brandDesc: String,
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    logo: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Brand = mongoose.model<BrandDocument>("Brand", BrandSchema);

export default Brand;
