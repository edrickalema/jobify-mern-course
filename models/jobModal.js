import mongoose from "mongoose";
import { JOB_STATUS, JOB_TYPE } from "../constants/constants.js";

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
    },
    jobLocation: {
      type: String,
      default: "my city",
    },
    position: {
      type: String,
    },
    jobStatus: {
      type: String,
      default: JOB_STATUS.PENDING,
      enum: Object.values(JOB_STATUS),
    },
    jobType: {
      type: String,
      enum: Object.values(JOB_TYPE),
      default: JOB_TYPE.INTERNSHIP
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    }
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Job',jobSchema)
