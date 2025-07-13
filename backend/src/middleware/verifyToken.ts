import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export default async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { accessToken } = req.cookies;
  if (!accessToken?.token || !accessToken) {
    res.status(400).json({ message: "not token provided" });
    return;
  }
  const { id } = jwt.verify(
    accessToken?.token,
    process.env.JWTSECRET as string,
  ) as JwtPayload;
  req.userId = id;
  next();
}
