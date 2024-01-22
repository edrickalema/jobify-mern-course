import { StatusCodes } from "http-status-codes";
import User from "../models/userModal.js";
import { comparePassword, hashedPassword } from "../constants/hashPassword.js";
import { UnauthenticatedError } from "../customErrors/customError.js";
import { createJWT } from "../utils/jwtUtil.js";
// Register User
export const registerUser = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  const isFirstRole = isFirstAccount ? "admin" : "user";
  req.body.role = isFirstRole;

 const hashPwd = await hashedPassword(req.body.password);
  req.body.password = hashPwd;

  const user = await User.create(req.body);

  res.status(StatusCodes.CREATED).json({ msg: "User created successfully" });
};

// Login User
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) throw new UnauthenticatedError('invalid user credentials');

  const isPasswordCorrect = await comparePassword(password, user.password);
  if (!isPasswordCorrect) throw new UnauthenticatedError('invalid user credentials');


  const token = createJWT({ userId: user._id, role: user.role });

  res.cookie('token', token, {
    expires: new Date(Date.now() +  24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  })
  res.status(StatusCodes.OK).json({msg:'User login successful'});
};

export const logout = (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(Date.now())
  });
  res.status(StatusCodes.OK).json({msg:'User logout successful'});
}
