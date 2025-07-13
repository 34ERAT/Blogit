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
    const { meta } = error;
    switch (error.code) {
      case "P2002":
        error.meta?.target;
        res.status(400).json({ message: `${meta?.target} already exist` });
        return;
      case "P2025":
        res.status(400).json({ message: `no record was found` });
        return;
    }
  }
  console.error(error);
  res.status(500).json({
    message: "something  went wrong ",
    // error: error,
  });
};
