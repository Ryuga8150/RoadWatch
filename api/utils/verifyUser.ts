import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";
import AppError from "./appError";
import { IUser, UserRequest } from "./types";

export const verifyUser = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new AppError("Unauthorized", 401));
  }

  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    (err: VerifyErrors | null, decoded: JwtPayload | undefined | string) => {
      if (err) {
        return next(new AppError("Forbidden", 403));
      }
      if (decoded) {
        req.user = decoded as IUser; // Cast to UserPayload if necessary
      }
      next();
    }
  );
};
