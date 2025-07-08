import { NextFunction, Request, Response } from "express";

export const errorHandle = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  console.error(error);
  res.status(500).json({
    message: "something  went wrong ",
    // error: error,
  });
};
