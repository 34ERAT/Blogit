import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export default async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const {
    accessToken: { token },
  } = req.cookies;
  if (!token) {
    res.status(400).json({ message: "not token provided" });
  }
  const { id } = jwt.verify(
    token,
    process.env.JWTSECRET as string,
  ) as JwtPayload;
  req.body.userId = id;
  next();
}
