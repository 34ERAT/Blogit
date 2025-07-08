import { NextFunction, Request, Response } from "express";
import asyncHandler from "../util/asyncHandler";
import { createUser, getUser } from "../services";
import { User } from "@prisma/client";
//TODO: create  login
export const register = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const newUser: User = req.body;
    console.log("this is the body", req.body);
    const user = await createUser(newUser);
    user ? res.status(200).json(user) : next();
  },
);
export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userid = req.body;
    const user = await getUser(userid);
    user ? res.status(200).json(user) : next();
  },
);
export const logout = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const userid = req.body;
    const user = await getUser(userid);
    user ? res.status(200).json(user) : next();
  },
);
