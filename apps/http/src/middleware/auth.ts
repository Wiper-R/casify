import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import env from "../env";

export async function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as {
      sub: string;
      role: "admin" | "user";
    };
    req.userId = payload.sub;
    req.role = payload.role;
    next();
  } catch (e) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
}
