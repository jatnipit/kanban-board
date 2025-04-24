import pool from "../services/database.js";

export const createColumn = async (column_name, boardId) => {
  try {
    const result = await pool.query(
      `INSERT INTO "Column" (column_name, board_id) 
                VALUES ($1, $2) 
                RETURNING *`,
      [column_name, boardId]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error creating column:", error);
    throw error;
  }
};

export const putColumnName = async (column_id, column_name) => {
  try {
    const result = await pool.query(
      `UPDATE "Column" 
                    SET column_name = $1 
                    WHERE id = $2 
                    RETURNING *`,
      [column_name, column_id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error renaming column:", error);
    throw error;
  }
};

export const deleteColumn = async (column_id) => {
  try {
    const result = await pool.query(
      `DELETE FROM "Column" 
            WHERE id = $1 
            RETURNING *`,
      [column_id]
    );
    return result.rowCount === 1;
  } catch (error) {
    console.error("Error deleting column:", error);
    throw error;
  }
};
