import { NextFunction, Request, Response } from "express";
import asyncHandler from "../util/asyncHandler";
import { createUser, getUser } from "../services";
import { User } from "@prisma/client";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { signin, signup } from "../zod";
export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const newUser = await signup.parseAsync(req.body);
    newUser.password = await bycrypt.hash(newUser.password, 10);
    const user = await createUser(newUser);
    user
      ? res.status(200).json({ message: "userCreated successfully" })
      : next(new Error());
  },
);
export const login = asyncHandler(
  async (req: Request, res: Response, _next: NextFunction) => {
    const { password, eMail, userName } = await signin.parseAsync(req.body);
    const user = await getUser((eMail as string) || (userName as string));
    if (!user) {
      res.status(404).json({ message: "username or password is wrong" });
      return;
    }
    const match = await bycrypt.compare(password, user?.password as string);
    const { id } = user as User;
    if (match) {
      const token = jwt.sign({ id }, process.env.JWTSECRET as string, {
        expiresIn: "1h",
      });
      res.cookie(
        "accessToken",
        { token },
        { expires: new Date(Date.now() + 3600_000), httpOnly: true },
      );
      res.status(200).json({ message: "success login" });
      return;
    }
    res.status(400).json({ message: "wrong email, userName or password" });
  },
);
export const logout = asyncHandler(
  async (_req: Request, res: Response, _next: NextFunction) => {
    res.clearCookie("accessToken");
    res.status(200).json({ message: "loged out" });
  },
);
