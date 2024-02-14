import { Router } from "express";
import {
  getUser,
  loginUser,
  registerUser,
} from "../Controllers/UserController.js";
import { verifyJWT } from "../Middlewares/AuthMiddleware.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user", verifyJWT, getUser);

export default router;
