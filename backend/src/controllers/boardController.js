import { createBoard } from "../models/boardModel.js";

export const addBoard = async (req, res) => {
  console.log("addBoard called");

  try {
    const { name } = req.body;
    const owner_id = req.user.id; 
    
    // Create the board in the database
    const newBoard = await createBoard({ name, owner_id });

    return res.status(201).json({
      message: "Board created successfully",
      board: newBoard,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create board" });
  }
};
