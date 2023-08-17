import mongoose from "mongoose";
import { UserDocument } from "./user.model";

export interface formDocument extends mongoose.Document {
  name: string;
  email: string;
  phone: number;
  company: string;
  message: string;
}

const FormSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    company: String,
    message: String,
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Form = mongoose.model<formDocument>("Forms", FormSchema);

export default Form;
