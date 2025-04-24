import {
  createColumn,
  putColumnName,
  deleteColumn,
} from "../models/columnModel.js";

export const addColumn = async (req, res) => {
  console.log("addColumn called");

  try {
    const { column_name, board_id } = req.body;
    const newColumn = await createColumn(column_name, board_id);

    return res
      .status(201)
      .json({ message: "Column created successfully", column: newColumn });
  } catch (error) {
    console.error("Error creating column:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const renameColumn = async (req, res) => {
  console.log("renameColumn called");

  try {
    const column_id = req.params.id;
    const { column_name } = req.body;
    const updatedColumn = await putColumnName(column_id, column_name);

    return res
      .status(201)
      .json({ message: "Column renamed successfully", column: updatedColumn });
  } catch (error) {
    console.error("Error renaming column:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const removeColumn = async (req, res) => {
  console.log("deleteColumn called");

  try {
    const column_id = req.params.id;
    const deleted = await deleteColumn(column_id);

    if (!deleted) {
      return res.status(404).json({ message: "Column not found" });
    }

    return res.status(204).end();
  } catch (error) {
    console.error("Error deleting column:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
