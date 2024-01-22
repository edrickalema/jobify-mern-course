import "express-async-errors";

// Modules
import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";
// Routers
import jobRouter from "./routes/jobRouter.js";
import authRouter from "./routes/authRouter.js";
import userRouter from "./routes/userRouter.js";
// Configurations
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_APIKEY,
  api_secret: process.env.CLOUD_SECRET,
});

// public
import path, { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.json());
app.use(cookieParser());
// show morgan logs in development mode
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.static(path.resolve(__dirname, "./public")));
// Routes

app.use("/api/v1/jobs", authenticateMiddleWare, jobRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", authenticateMiddleWare, userRouter);
// Middleware
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import { authenticateMiddleWare } from "./middlewares/authMiddleware.js";

app.get("*", (req, res) => {
  res.send(path.resolve(__dirname, "./public", "index.html"));
});
app.use("*", (req, res) => {
  res.status(404).json({ msg: "Resource Not Found" });
});

app.use(errorMiddleware);

const port = process.env.PORT || 3000;
const DB = process.env.DATABASE_URI.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
try {
  await mongoose
    .connect(DB)
    .then(() => console.log("Server connected to database"));

  app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
