import path from "path";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

let store = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, path.join(__dirname, "../uploads/images/"));
  },

  //TODO: add Filetpe checking

  // By default, multer removes file extensions so let's add them back
  filename: (req, file, callback) => {
    callback(null, uuidv4() + path.extname(file.originalname));
  },
});

let upload = multer({ storage: store }).single("image");

export default upload;
