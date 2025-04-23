import pool from "../services/database.js";

export const createUser = async ({ username, email, passwordHash }) => {
  try {
    const result = await pool.query(
      `INSERT INTO "User" (username, email, password) 
            VALUES ($1, $2, $3) 
            RETURNING *`,
      [username, email, passwordHash]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export const getUserByEmail = async (username, email) => {
  try {
    const result = await pool.query(
      `SELECT * FROM "User" WHERE username = $1 OR email = $2`,
      [username, email]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw error;
  }
};

export const getUserByEmailOrUsername = async (email) => {
  try {
    const result = await pool.query(
      `SELECT * FROM "User" WHERE email = $1 OR username = $1`,
      [email]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw error;
  }
};
