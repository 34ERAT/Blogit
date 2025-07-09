import { NextFunction, Request, Response } from "express";
import asyncHandler from "../util/asyncHandler";
import { createUser, getUser } from "../services";
import { User } from "@prisma/client";
import bycrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const newUser: User = req.body;
    newUser.password = await bycrypt.hash(newUser.password, 10);
    const user = await createUser(newUser);
    user
      ? res.status(200).json({ message: "userCreated successfully" })
      : next();
  },
);
export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userName_eMail, password } = req.body;
    const user = await getUser(userName_eMail);
    if (!user) {
      next();
      return;
    }
    const match = await bycrypt.compare(password, user?.password as string);
    const { username, id } = user as User;
    if (match) {
      const token = jwt.sign(
        { username, id },
        process.env.JWTSECRET as string,
        { expiresIn: "1h" },
      );
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
  async (req: Request, res: Response, next: NextFunction) => {
    const userid = req.body;
    const user = await getUser(userid);
    user ? res.status(200).json(user) : next();
  },
);
