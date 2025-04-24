import express from "express";
import * as columnController from "../controllers/columnController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware); // Apply auth middleware to all routes

router.post("/add-column", columnController.addColumn);
router.put("/rename-column/:id", columnController.renameColumn);

export default router;
