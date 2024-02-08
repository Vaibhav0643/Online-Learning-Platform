import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

import {
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from "../configs/index.js";

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) {
      console.log("userImage not Found");
      return null;
    }
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(filePath);
    return result;
  } catch (error) {
    fs.unlinkSync(filePath);
    console.log("File upload on cloudinary is Failed : ", error);
    return null;
  }
};

export { uploadOnCloudinary };
