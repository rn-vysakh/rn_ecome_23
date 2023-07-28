import { Router } from "express";
import log from "../logger/logger";
import pingRoutes from "./ping/ping.routes";
import userRoutes from "./user/user.routes";
import ImageRoutes from "./imageUpload/image.routes";

import categoryRoutes from "./categories/categories.routes";
import brandRoutes from "./brand/brand.routes";
import tagRoutes from "./tag/tag.routes";
import ProductRoutes from "./products/product.routes";
import HomeRoutes from "./home/homeSlider.routes";
import FileRoutes from "./fileUpload/file.routes";

const router: Router = Router();

router.use("/ping", pingRoutes);
router.use("/user", userRoutes);
router.use("/category", categoryRoutes);
router.use("/brand", brandRoutes);
router.use("/tag", tagRoutes);
router.use("/product", ProductRoutes);
router.use("/image", ImageRoutes);
router.use("/home", HomeRoutes);
router.use("/file", FileRoutes);

export default router;
