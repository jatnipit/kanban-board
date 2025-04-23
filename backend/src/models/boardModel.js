import pool from "../services/database.js";

export const createBoard = async (board) => {
  try {
    const result = await pool.query(
      `INSERT INTO "Board" (name, owner_id) 
                VALUES ($1, $2) 
                RETURNING *`,
      [board.name, board.owner_id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error creating board:", error);
    throw error;
  }
};
