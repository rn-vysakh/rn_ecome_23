import mongoose from "mongoose";
import { UserDocument } from "./user.model";
import { imageDocument } from "./image.model";
import { ProductDocument } from "./products.model";
import { CategoryDocument } from "./categories.model";

export interface HomeDocument extends mongoose.Document {
  userId: UserDocument["_id"];
  type: string;
  title: string;
  products: [ProductDocument["_id"]];
  image: imageDocument["_id"];
  url: string;
  sliders: [
    {
      image: imageDocument["_id"];
      title: string;
      description: string;
      url: string;
    }
  ];
  description: string;
  categories: [CategoryDocument["_id"]];
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const HomeSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    type: {
      type: String,
      required: true,
      enum: ["products", "banner", "slider", "category"],
    },
    title: { type: String },
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
    image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
    url: { type: String },
    sliders: [
      {
        image: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
        title: { type: String },
        description: { type: String },
        url: { type: String },
      },
    ],
    description: { type: String },
    categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    status: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const Home = mongoose.model<HomeDocument>("homeSection", HomeSchema);

export default Home;
