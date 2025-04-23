import jwt from "jsonwebtoken";

export const generateToken = (payload, expiresIn = "15m") => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

export const generateRefreshToken = (payload, expiresIn = "7d") => {
  return jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn });
};

export const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};

export const verifyRefreshToken = (token) => {
  try {
    return jwt.verify(token, process.env.REFRESH_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired refresh token");
  }
};
