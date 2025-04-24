import express from "express";
import * as boardController from "../controllers/boardController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware); // Apply auth middleware to all routes

router.post("/add-board", boardController.addBoard);
router.put("/rename-board/:id", boardController.renameBoard);
router.delete("/delete-board/:id", boardController.removeBoard);
router.get("/get-all-boards", boardController.getAllBoards);
router.post("/invite-board-member", boardController.inviteBoardMember);

export default router;
