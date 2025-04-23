import express from "express";
import * as boardController from "../controllers/boardController.js";

const router = express.Router();

router.post("/add-board", boardController.addBoard);

export default router;
