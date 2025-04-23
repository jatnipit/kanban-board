import { verifyRefreshToken, generateToken } from "../utils/jwtUtils.js";

export const refreshAccessToken = (req, res) => {
  try {
    // Get the refresh token from cookies
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      return res.status(401).json({ message: "Refresh token missing" });
    }

    // Verify the refresh token
    const decoded = verifyRefreshToken(refreshToken);

    // Generate a new access token
    const newAccessToken = generateToken({ id: decoded.id });

    return res.status(200).json({
      message: "Access token refreshed",
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error(error);
    return res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};