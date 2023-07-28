import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface CategoryDocument extends mongoose.Document {
  userId: String;
  status?: boolean;
  categoryName: string;
  description?: string;
  order?: number;
  image?: string;
  isSubCategory?: boolean;
  parentId?: string;
  parentName?: string;
  categorySection?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const CategorySchema = new mongoose.Schema(
  {
    userId: String,
    categoryName: { type: String, required: true },
    description: { type: String, required: false },
    order: { type: Number, required: false },
    image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
    status: { type: Boolean, default: true },
    categorySection: { type: String, enum: ["featured", "gp1", "gp2", "gp3"] },
    isSubCategory: { type: Boolean, default: false },
    parentId: { type: String },
    parentName: { type: String },
  },
  { timestamps: true }
);

const Category = mongoose.model<CategoryDocument>("Categories", CategorySchema);

export default Category;
