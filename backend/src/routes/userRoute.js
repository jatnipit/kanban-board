import express from "express";
import * as userController from "../controllers/userController.js";
import { loginLimiter } from "../middlewares/authMiddleware.js";
import { refreshAccessToken } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", loginLimiter, userController.login);
router.post("/refresh-token", refreshAccessToken);

export default router;
