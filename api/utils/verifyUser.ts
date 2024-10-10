import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import AppError from "./appError";
// types.ts or a similar file
export interface UserPayload {
  id: string; // or whatever your user ID type is
  // Add any other properties you expect in the user object
  name?: string;
}

export interface JwtError extends Error {
  name: string;
  message: string;
  // Include any other properties you expect in the JWT error
}

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new AppError("Unauthorized", 401));
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) {
      return next(new AppError("Forbidden", 403));
    }
    req.user = user;
    next();
  });
};
