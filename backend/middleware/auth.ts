import { config } from "dotenv";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

config();
const SECRET_KEY = process.env.SECRET_KEY;

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Token not found or invalid format",
      });
    }

    const token = header.split(" ")[1];

    if (!SECRET_KEY) {
      console.error("SECRET_KEY is not defined in .env");
      return res.status(500).json({ success: false, message: "Server error" });
    }

    const decoded = jwt.verify(token, SECRET_KEY);

    console.log("Decoded Token:", decoded);
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(403).json({
      success: false,
      message: "Unauthorized or invalid token",
    });
  }
};
