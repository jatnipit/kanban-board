import {
  createBoard,
  putBoardName,
  addBoardMember,
  deleteBoard,
  getBoardById,
} from "../models/boardModel.js";

export const addBoard = async (req, res) => {
  console.log("addBoard called");

  try {
    const { board_name } = req.body;
    const owner_id = req.user.id; // Assuming you have user ID in req.user

    // Create the board in the database
    const newBoard = await createBoard({ board_name, owner_id });

    return res.status(201).json({
      message: "Board created successfully",
      board: newBoard,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to create board" });
  }
};

export const renameBoard = async (req, res) => {
  console.log("renameBoard called");

  try {
    const board_id = req.params.id;
    const { new_board_name } = req.body;

    const board = await getBoardById(board_id);

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }
    const { owner_id } = board[0]; // Assuming the board is returned as an array

    if (owner_id !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to rename this board" });
    }

    // Rename the board in the database
    const updatedBoard = await putBoardName(board_id, new_board_name);

    return res.status(201).json({
      message: "Board renamed successfully",
      board: updatedBoard,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to rename board" });
  }
};

export const removeBoard = async (req, res) => {
  console.log("deleteBoard called");

  try {
    const board_id = req.params.id;

    // Delete the board from the database
    const deleted = await deleteBoard(board_id);

    if (!deleted) {
      return res.status(404).json({ message: "Board not found" });
    }

    return res.status(204).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to delete board" });
  }
};

export const getAllBoards = async (req, res) => {
  console.log("getAllBoards called");

  try {
    const owner_id = req.user.id; // Assuming you have user ID in req.user

    // Fetch all boards for the user from the database
    const boards = await getAllBoardsByOwnerId(owner_id);

    return res.status(200).json({
      message: "Boards fetched successfully",
      boards,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to fetch boards" });
  }
};

export const inviteBoardMember = async (req, res) => {
  console.log("addBoardMember called");

  try {
    const { board_id, user_id } = req.body;

    // Add the user as a member of the board in the database
    const newBoardMember = await addBoardMember(board_id, user_id);

    return res.status(201).json({
      message: "Board member added successfully",
      boardMember: newBoardMember,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to add board member" });
  }
};
