import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import {
  createUser,
  getUserByEmail,
  getUserByEmailOrUsername,
} from "../models/userModel.js";
import { generateToken, generateRefreshToken } from "../utils/jwtUtils.js";

export const register = async (req, res) => {
  console.log("register called");

  try {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await getUserByEmail({ username, email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Create the user in the database
    const newUser = await createUser({ username, email, passwordHash });

    // Generate a JWT token
    const accessToken = generateToken({ id: newUser.id });
    const refreshToken = generateRefreshToken({ id: newUser.id });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Registration failed" });
  }
};

export const login = async (req, res) => {
  console.log("login called");

  try {
    const { email, password } = req.body;

    // Check if the user exists
    const existingUser = await getUserByEmailOrUsername(email);
    console.log(existingUser);
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid credentials1" });
    }

    // Compare the password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials2" });
    }

    // Generate a JWT token
    const accessToken = generateToken({ id: existingUser.id });
    const refreshToken = generateRefreshToken({ id: existingUser.id });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({
      message: "Login successful",
      accessToken,
      user: {
        id: existingUser.id,
        username: existingUser.username,
        email: existingUser.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Login failed" });
  }
};

export const logout = async (req, res) => {
  console.log("logout called");

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  return res.status(200).json({ message: "Logout successful" });
};
