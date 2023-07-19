import mongoose from "mongoose";

export interface imageDocument extends mongoose.Document {
  userId: string;
  type: string;
  smUrl: string;
  mdUrl: string;
  lgUrl: string;
  hqUrl: string;
  ogUrl: string;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const ImageSchema = new mongoose.Schema(
  {
    userId: String,
    type: { type: String, required: true },
    smUrl: { type: String, required: true },
    mdUrl: { type: String, required: true },
    lgUrl: { type: String, required: true },
    hqUrl: { type: String, required: true },
    ogUrl: { type: String, required: true },
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Image = mongoose.model<imageDocument>("Image", ImageSchema);

export default Image;
