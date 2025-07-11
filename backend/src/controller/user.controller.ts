import { NextFunction, Request, Response } from "express";
import asyncHandler from "../util/asyncHandler";
import { updateUser } from "../services";
import { resetPassword, signup, userid } from "../zod";

export const patchUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const modifiedUser = await signup.parseAsync(req.body);
    const modified = await updateUser(modifiedUser);
    modified ? res.status(200).json(modified) : next(new Error());
  },
);
export const patchPassword = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { oldPassword, newPassword: password } =
      await resetPassword.parseAsync(req.body);
    const id = await userid.parseAsync(req.userId);
    const user = await updateUser({ id, password });
    user
      ? res.status(200).json({ message: "password modified" })
      : next(new Error());
  },
);
