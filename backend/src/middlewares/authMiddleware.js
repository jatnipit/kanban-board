import rateLimit from "express-rate-limit";
import { verifyToken, verifyRefreshToken } from "../utils/jwtUtils.js";

export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 100 requests per windowMs
  handler: (req, res) => {
    res.status(429).json({
      status: "fail",
      message: "Too many login attempts, please try again later.",
    });
  },
});

export const authMiddleware = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    
    try {
        const decoded = verifyToken(token);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}