import { config } from "dotenv";
import { NextFunction, Request, Response } from "express";
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
    if (!header) {
      return res.status(401).json({
        success: false,
        message: "Token not found",
      });
    }

    // Expect header like: "Bearer <token>"
    const parts = header.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization header format",
      });
    }

    const token = parts[1];

    if (!SECRET_KEY) {
      return res.send("secret key undefined");
    }
    const decoded = jwt.verify(token, SECRET_KEY) as any;

    if (!decoded._doc?._id) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid token payload",
      });
    }

    console.log(decoded, "Decoded token");

    next();
  } catch (error) {
    console.error("Token verification error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
      error: error instanceof Error ? error.message : error,
    });
  }
};
