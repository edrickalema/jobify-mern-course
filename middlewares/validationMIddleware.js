import { body, validationResult, param } from "express-validator";
import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../customErrors/customError.js";
import { JOB_STATUS, JOB_TYPE } from "../constants/constants.js";
import mongoose from "mongoose";
import Job from "../models/jobModal.js";
import User from "../models/userModal.js";
function withValidation(validation) {
  return [
    validation,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const message = errors.array().map((err) => err.msg);

        if (message[0].startsWith("Job with")) {
          throw new NotFoundError(message);
        }

        if (message[0].startsWith("not authorized")) {
          throw new UnauthorizedError(message);
        }
        throw new BadRequestError(message);
      }
      next();
    },
  ];
}

export const validateJobInput = withValidation([
  body("company").not().isEmpty().withMessage("Company is required"),
  body("position").not().isEmpty().withMessage("position is required"),
  body("jobLocation").not().isEmpty().withMessage("Job Location is required"),
  body("jobStatus")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("Job Status is required"),
  body("jobType")
    .isIn(Object.values(JOB_TYPE))
    .withMessage("Job Type is required"),
]);

export const validateIdParams = withValidation([
  param("id").custom(async (value, { req }) => {
    const isValidMongooseId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidMongooseId) {
      throw new BadRequestError("Invalid mongoose Id");
    }
    const theJob = await Job.findById(value);

    const isAdmin = req.user.role === "admin";
    const isOwner = req.user.userId === theJob.createdBy.toString();
    console.log(isAdmin, isOwner);

    if (!isAdmin && !isOwner) {
      throw new UnauthorizedError("now authorized");
    }

    if (!theJob) throw new NotFoundError(`Job with id: ${value} is not found`);
  }),
]);

export const validateUserRegister = withValidation([
  body("name").not().isEmpty().withMessage("Name is required"),
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (email) => {
      const theUser = await User.findOne({ email });
      if (theUser)
        throw new BadRequestError(`User with email: ${email} already exists`);
    }),
  body("password")
    .not()
    .isEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password is required with 6 characters"),
  body("lastName").not().isEmpty().withMessage("lastName is required"),
]);
export const validateUserUpdate = withValidation([
  body("name").not().isEmpty().withMessage("Name is required"),
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async (email, { req }) => {
      const theUser = await User.findOne({ email });
      if (theUser && theUser._id.toString() !== req.user.userId)
        console.log(req.user);
      throw new BadRequestError(`User with email: ${email} already exists`);
    }),

  body("lastName").not().isEmpty().withMessage("lastName is required"),
]);
export const validateLogin = withValidation([
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),
  body("password").not().isEmpty().withMessage("Password is required"),
]);
