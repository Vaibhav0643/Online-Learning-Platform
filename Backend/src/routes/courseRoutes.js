import express from "express";

import {
  deleteCourse,
  enrollUserInCourse,
  getCourseDetails,
  uploadCourse,
  updateUserProgress,
} from "../controllers/courseController.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/uploadCourse",
  verifyToken,
  upload.single("courseBannerImage"),
  uploadCourse
);

router.get("/:courseId/getCourseDetails", verifyToken, getCourseDetails);

router.post("/:courseId/enrollUser", verifyToken, enrollUserInCourse);

router.delete("/:courseId/deleteCourse", verifyToken, deleteCourse);

router.post(
  "/:courseId/:videoNumber/:videoCount/updateUserProgress",
  verifyToken,
  updateUserProgress
);

export default router;
