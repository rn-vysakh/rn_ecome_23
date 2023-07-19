import { Router } from "express";
import {
  signup,
  signin,
  signout,
  changePassword,
  getAllUser,
  getSingleUser,
  updateUser,
  disableUser,
  enableUser,
} from "./user.controller";
import {
  createAccountSchema,
  updateAccountSchema,
  loginSchema,
  changePasswordSchema,
} from "./user.schemas";
import verifyAccessToken from "../../middlewares/auth.middleware";

const userRoutes: Router = Router();

//auth routes
userRoutes.post("/signup", createAccountSchema, signup);
userRoutes.post("/signin", loginSchema, signin);
userRoutes.delete("/signout", verifyAccessToken, signout);
userRoutes.patch(
  "/changepassword",
  verifyAccessToken,
  changePasswordSchema,
  changePassword
);

//get alluser
userRoutes.get("/:role", verifyAccessToken, getAllUser);
userRoutes.get("/single/:id", verifyAccessToken, getSingleUser);
userRoutes.patch("/:id", verifyAccessToken, updateAccountSchema, updateUser);
userRoutes.delete("/:id", verifyAccessToken, disableUser);
userRoutes.patch("/enableuser/:id", verifyAccessToken, enableUser);

export default userRoutes;
