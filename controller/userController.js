import Job from "../models/jobModal.js";
import User from "../models/userModal.js";
import { promises as fs } from "fs";
import cloudinary from "cloudinary";
import { StatusCodes } from "http-status-codes";
export const currentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();
  res.status(StatusCodes.OK).json(userWithoutPassword);
};
export const updateUser = async (req, res) => {
  const user = { ...req.body };
  delete user.password;

  if (req.file) {
    const response = await cloudinary.v2.uploader.upload(req.file.path);
    await fs.unlink(req.file.path);

    user.avatar = response.secure_url;
    user.avatarPublic = response.public_id;
  }
  const updatedUser = await User.findByIdAndUpdate(req.user.userId, user, {
    new: true,
  });

  if (req.file && updatedUser.avatarPublic) {
    await cloudinary.v2.uploader.destroy(updatedUser.avatarPublic);
  }

  res.status(StatusCodes.OK).json({ msg: "user is updated successfully" });
};

export const getApplicationStats = async (req, res) => {
  const users = await User.countDocuments();
  const jobs = await Job.countDocuments();
  res.status(StatusCodes.OK).json({ users, jobs });
};

export const getUserStats = (req, res) => {
  res.status(StatusCodes.OK).json({ msg: "user stats" });
};
