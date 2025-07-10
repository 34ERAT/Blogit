import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

export const errorHandle = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof ZodError) {
    const { message, path } = error.errors[0];
    res.status(404).json({ message, path });
    return;
  }
  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code == "P2002") {
      const target = error.meta?.target;
      res.status(400).json({ message: `${target} already exist` });
      return;
    }
  }
  console.error(error);
  res.status(500).json({
    message: "something  went wrong ",
    // error: error,
  });
};
