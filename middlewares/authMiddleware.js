import { UnauthenticatedError } from "../customErrors/customError.js";
import { verifyJWT } from "../utils/jwtUtil.js";
export const authenticateMiddleWare = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) throw new UnauthenticatedError("unauthenticated user");
  try {
    const { userId, role } = verifyJWT(token);

    req.user = { userId, role };
    next();
  } catch (error) {}
};
