import { Router } from "express";
import { verifyJWT } from "../Middlewares/AuthMiddleware.js";
import {
  DeleteJob,
  addJobPost,
  editJobPost,
  getAllJobPost,
  getJobPost,
} from "../Controllers/JobController.js";

const router = Router();

router.get("/", getAllJobPost);
router.get("/getJob/:jobId", getJobPost);

//Protected/Secured Routes
router.post("/addJob", verifyJWT, addJobPost);
router.put("/updateJob/:jobId", verifyJWT, editJobPost);
router.delete("/deleteJob/:jobId", verifyJWT, DeleteJob);

export default router;
