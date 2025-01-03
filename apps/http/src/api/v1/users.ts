import { Router } from "express";
import { auth } from "../../middleware/auth";
import prisma from "@repo/db/client";

export const router = Router();
router.use(auth);

router.get("/@me", async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.userId } });
  res.json(user);
});
