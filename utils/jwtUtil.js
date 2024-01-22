import Jwt from "jsonwebtoken";

export const createJWT = (payload) => {
  const token = Jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
  return token;
};

export const verifyJWT = (token) => {
  const decoded = Jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
};
