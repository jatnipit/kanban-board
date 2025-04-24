import database from "../services/database.js";

export const createTask = async (
  task_name,
  column_id,
  start_date,
  due_date,
  description
) => {
  try {
    const result = await database.query(
      `INSERT INTO "Task" (task_name, column_id, start_date, due_date, description) 
         VALUES ($1, $2, $3, $4, $5) 
         RETURNING *`,
      [task_name, column_id, start_date, due_date, description]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const putTaskName = async (task_id, task_name, column_id) => {
  try {
    const result = await database.query(
      `UPDATE "Task" 
         SET task_name = $1, column_id = $2
         WHERE task_id = $3
         RETURNING *`,
      [task_name, column_id, task_id]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const deleteTask = async (task_id) => {
  try {
    const result = await database.query(
      `DELETE FROM "Task" 
         WHERE id = $1
         RETURNING *`,
      [task_id]
    );
    return result.rowCount === 1; // Returns true if a row was deleted
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};
