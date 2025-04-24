import pool from "../services/database.js";

export const createBoard = async (board) => {
  try {
    const result = await pool.query(
      `INSERT INTO "Board" (board_name, owner_id) 
                VALUES ($1, $2) 
                RETURNING *`,
      [board.board_name, board.owner_id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error creating board:", error);
    throw error;
  }
};

export const putBoardName = async (board_id, new_board_name) => {
  try {
    const result = await pool.query(
      `UPDATE "Board" SET board_name = $1 WHERE id = $2 RETURNING *`,
      [new_board_name, board_id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error renaming board:", error);
    throw error;
  }
};

export const deleteBoard = async (board_id) => {
  try {
    const result = await pool.query(
      `DELETE FROM "Board" WHERE id = $1 RETURNING *`,
      [board_id]
    );
    return result.rowCount === 1;
  } catch (error) {
    console.error("Error deleting board:", error);
    throw error;
  }
};

export const getBoardById = async (board_id) => {
  try {
    const result = await pool.query(`SELECT * FROM "Board" WHERE id = $1`, [
      board_id,
    ]);
    return result.rows;
  } catch (error) {
    console.error("Error fetching boards:", error);
    throw error;
  }
};

export const addBoardMember = async (board_id, user_id) => {
  try {
    const result = await pool.query(
      `INSERT INTO "BoardMember" (board_id, user_id) 
                    VALUES ($1, $2) 
                    RETURNING *`,
      [board_id, user_id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error adding board member:", error);
    throw error;
  }
};
