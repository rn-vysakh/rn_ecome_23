import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { CategoryDocument } from "./categories.model";

export interface TagDocument extends mongoose.Document {
  userId: String;
  title: string;
  value: string;
  unit: string;
  label: String;
  category: CategoryDocument["_id"];
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const TagSchema = new mongoose.Schema(
  {
    userId: String,
    title: { type: String, required: true },
    value: { type: String, required: true },
    unit: { type: String, required: true },
    label: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Categories" },
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Tag = mongoose.model<TagDocument>("Tags", TagSchema);

export default Tag;
