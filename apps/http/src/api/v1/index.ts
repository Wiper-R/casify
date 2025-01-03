import { Router } from "express";
import { SigninSchema, SignupSchema } from "../../types";
import prisma from "@repo/db/client";
import { compare, hash } from "../../scrypt";
import jwt from "jsonwebtoken";
import env from "../../env";
import { router as usersRouter } from "./users";

export const router = Router();

router.post("/signin", async (req, res) => {
  const data = await SigninSchema.parseAsync(req.body);
  const user = await prisma.user.findUnique({
    where: { email: data.email },
    select: { password: true, id: true },
  });
  if (!user) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }

  const isValid = await compare(data.password, user.password);
  if (!isValid) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  }

  const token = jwt.sign({}, env.JWT_SECRET, { subject: user.id });
  res.cookie("token", token, { httpOnly: true });
  res.json({});
});

router.post("/signup", async (req, res) => {
  const data = await SignupSchema.parseAsync(req.body);
  const hashedPassword = await hash(data.password);
  try {
    const user = await prisma.user.create({
      data: { ...data, password: hashedPassword },
    });
    res.json(user);
  } catch (e) {
    res.status(400).json({ message: "User already exists" });
    return;
  }
});

// Routers
router.use("/users", usersRouter);
