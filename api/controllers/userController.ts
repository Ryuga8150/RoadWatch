import { NextFunction, Request, Response } from "express";

const bcryptjs = require("bcryptjs");

import User from "../models/userModel";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";

export const getUsers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await User.find();

    res.status(200).json({
      status: "success",
      data: {
        users,
      },
    });
  }
);

export const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.user.id !== req.params.id)
      return next(new AppError("You can only update your own account", 401));

    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    req.body.password = undefined;
    res.status(200).json({
      status: "success",
      data: {
        user: updatedUser,
      },
    });
  }
);

export const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.params.id !== req.user.id)
      return next(new AppError("You can only delete your own acount!", 401));
    await User.findByIdAndDelete(req.user.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);

export const getUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.params.id);

    if (!user) return next(new AppError("User Not Found!", 404));

    user.password = undefined;

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  }
);
