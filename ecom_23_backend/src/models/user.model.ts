import mongoose from "mongoose";

export interface UserDocument extends mongoose.Document {
  firstName: string;
  lastName: string;
  companyName: string;
  email: string;
  countryCode: string;
  phone: string;
  password: string;
  role: string;
  status?: boolean;
  disabledDate?: Date;
  disabledReason: string;
  disabledBy: string;
  address: string;
  bankAccNo: string;
  bankName: string;
  ibanNo: string;
  trnNo: string;
  location: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    companyName: String,
    email: { type: String, required: true, unique: true },
    countryCode: { type: String },
    phone: { type: String, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: [
        "super_admin",
        "admin",
        "it",
        "tele_sales",
        "seller",
        "seller_manager",
        "logistics",
        "accounting",
        "support",
        "user",
      ],
    },
    status: { type: Boolean, default: true },
    disabledDate: Date,
    disabledReason: String,
    disabledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    address: String,
    bankAccNo: String,
    bankName: String,
    ibanNo: String,
    trnNo: String,
    location: String,
  },
  { timestamps: true }
);

const User = mongoose.model<UserDocument>("User", UserSchema);

export default User;
