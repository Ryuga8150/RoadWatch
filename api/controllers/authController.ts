import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "./../models/userModel";
import catchAsync from "./../utils/catchAsync";
import AppError from "./../utils/appError";

const signToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user: any, statusCode: number, res: Response) => {
  const token = signToken(user._id.toString());

  const cookieOptions = {
    expires: new Date(
      Date.now() +
        Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, // Prevents access from third parties
    secure: false,
  };

  if (process.env.NODE_ENV === "production") cookieOptions.secure = true;

  res.cookie("jwt", token, cookieOptions);

  user.password = undefined; // Remove password from the response

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export const signup = catchAsync(async (req: Request, res: Response) => {
  const newUser = await User.create(req.body);
  createSendToken(newUser, 200, res);
});

export const signin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) return next(new AppError("No user exists with that email", 404));

    if (!(await user.correctPassword(password, user.password as string))) {
      return next(new AppError("Invalid credentials", 401));
    }

    createSendToken(user, 200, res);
  }
);

export const logout = (req: Request, res: Response) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({ status: "success" });
};

const generatePassword = (digits: number): string => {
  return Math.random().toString(36).slice(-digits);
};

export const google = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, photo } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      createSendToken(user, 200, res);
    } else {
      const generatedPassword = generatePassword(8) + generatePassword(8);

      const newUser = await User.create({
        username: name.split(" ").join("").toLowerCase() + generatePassword(4),
        email,
        password: generatedPassword,
        avatar: photo,
      });
      createSendToken(newUser, 200, res);
    }
  }
);

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    status: "success",
    data: {
      loggedIn: true,
    },
  });
};
