import express from "express";
const router = express.Router();

import { validateUserUpdate } from "../middlewares/validationMIddleware.js";
import {
  currentUser,
  updateUser,
  getUserStats,
  getApplicationStats,
} from "../controller/userController.js";
import upload from "../middlewares/multerMiddleware.js";

router.route("/current-user").get(currentUser);

router.route("/update-user").patch( upload.single('avatar'), updateUser);

router.route("/admin/app-stats").get(getApplicationStats);

export default router;