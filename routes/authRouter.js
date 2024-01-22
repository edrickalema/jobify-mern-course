import express from "express";
import {
  registerUser,
  loginUser,
  logout,
} from "../controller/authController.js";
import {
  validateUserRegister,
  validateLogin,
} from "../middlewares/validationMIddleware.js";

const router = express.Router();

router.route("/register").post(validateUserRegister, registerUser);
router.route("/login").post(validateLogin, loginUser);
router.route("/logout").get(logout);

export default router;
