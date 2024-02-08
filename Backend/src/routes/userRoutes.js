import express from "express";

import { createUser, loginUser } from "../controllers/authController.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

router.post("/createUser", upload.single("userImage"), createUser);

router.post("/login", loginUser);

export default router;
