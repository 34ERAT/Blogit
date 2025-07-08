import { NextFunction, Request, Response } from "express";
import asyncHandler from "../util/asyncHandler";
import { updateUser } from "../services";
import { User } from "@prisma/client";

export const patchUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const modifiedUser: User = req.body;
    const modified = await updateUser(modifiedUser);
    modified ? res.status(200).json(modified) : next();
  },
);
export const patchPassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const modifiedPassword: User = req.body;
    const password = await updateUser(modifiedPassword);
    password ? res.status(200).json({ message: "password modified" }) : next();
  },
);
