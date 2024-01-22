import { StatusCodes } from "http-status-codes";

export const errorMiddleware = (err, req, res, next) => {
  const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({ message });
};
