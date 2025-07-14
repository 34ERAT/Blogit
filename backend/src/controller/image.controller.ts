import { NextFunction, Request, Response } from "express";
import asyncHandler from "../util/asyncHandler";
import { upload } from "../services";
export const uploadImage = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      res.status(400).send({ error: "No file uploadImage" });
      return;
    }
    const url = await upload(req.file.buffer);
    if (url) {
      res.status(200).send({ url });
      return;
    }
    next(new Error());
  },
);
