import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import env from "../env";

export function auth({ check = true }: { check?: boolean }) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!check && !token) {
      return next();
    }
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
    }
  };
}
