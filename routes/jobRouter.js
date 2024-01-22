import { Router } from "express";
import {
  createJob,
  getJobs,
  getJob,
  editJob,
  deleteJob,
  showStats,
} from "../controller/jobControllers.js";
import {
  validateIdParams,
  validateJobInput,
} from "../middlewares/validationMIddleware.js";
const router = Router();

router.route("/stats").get(showStats);
router.route("/").get(getJobs).post(validateJobInput, createJob);

router
  .route("/:id")
  .get(validateIdParams, getJob)
  .delete(validateIdParams, deleteJob)
  .patch(validateIdParams, validateJobInput, editJob);

export default router;
