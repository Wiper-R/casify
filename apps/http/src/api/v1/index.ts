import { Router } from "express";
import {
  GetResetCode,
  SetNewPassword,
  SigninSchema,
  SignupSchema,
  ValidateResetCode,
} from "../../types";
import prisma from "@repo/db/client";
import { compare, hash } from "../../scrypt";
import jwt from "jsonwebtoken";
import env from "../../env";
import { router as usersRouter } from "./users";
import { router as ordersRouter } from "./orders";
import { auth } from "../../middleware/auth";
import { generateRandomCode } from "../../util";
export const router = Router();

router.post("/signin", async (req, res) => {
  const data = await SigninSchema.parseAsync(req.body);
  const user = await prisma.user.findUnique({
    where: { email: data.email },
    select: { password: true, id: true, role: true },
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

  const token = jwt.sign({ role: user.role }, env.JWT_SECRET, {
    subject: user.id,
  });
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

router.post("/signout", auth, async (_, res) => {
  res.cookie("token", "", { httpOnly: true, expires: new Date() });
  res.json({});
});

router.post("/get-reset-code", async (req, res) => {
  const { email } = await GetResetCode.parseAsync(req.body);
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }
  const code = generateRandomCode(6);
  const validUntil = new Date();
  validUntil.setMinutes(validUntil.getMinutes() + 5);
  try {
    const exists = await prisma.resetCode.findUnique({ where: { email } });
    if (exists && exists.validUntil < new Date()) {
      await prisma.resetCode.update({
        where: { email },
        data: { code, validUntil },
      });
      res.json({});
      return;
    }
    if (exists) {
      res.status(400).json({ message: "Wait before generating other code" });
      return;
    }

    await prisma.resetCode.create({ data: { email, code, validUntil } });
    res.json({});
    return;
  } catch (e) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.post("/validate-reset-code", async (req, res) => {
  const { email, code } = await ValidateResetCode.parseAsync(req.body);
  const valid = await prisma.resetCode.findUnique({ where: { email, code } });
  if (valid) {
    res.json({ valid: true });
  }
  res.status(400).json({ valid: false });
});

router.post("/new-password", async (req, res) => {
  const { email, code, password } = await SetNewPassword.parseAsync(req.body);
  const hashedPassword = await hash(password);
  const queries = [];
  queries.push(prisma.resetCode.delete({ where: { code, email } }));
  queries.push(
    prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    }),
  );
  try {
    await prisma.$transaction(queries);
    res.json({});
  } catch (e) {
    res.status(400).json({ message: "Invalid Request" });
  }
});

// Routers
router.use("/users", usersRouter);
router.use("/orders", ordersRouter);
