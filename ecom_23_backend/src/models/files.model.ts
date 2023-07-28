import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface fileDocument extends mongoose.Document {
  userId: UserDocument["_id"];
  type: string;
  title: string;
  fileName: string;
  url: string;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const FileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: String,
    title: String,
    fileName: String,
    url: { type: String, required: true },
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const File = mongoose.model<fileDocument>("File", FileSchema);

export default File;
