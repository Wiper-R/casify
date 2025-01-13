import { COLORS, FINISHES, MODELS, MATERIALS } from "@repo/constants";
import { z } from "zod";

export const SigninSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  name: z.string(),
});

// TODO: Learn what it is actually doing
const toTuple = <T extends readonly any[]>(arr: T) =>
  arr.map((item) => item.value) as {
    [K in keyof T]: T[K] extends { value: infer V } ? V : never;
  };

export const CreateOrderSchema = z.object({
  imageUrl: z.string().url(),
  height: z.number(),
  width: z.number(),
});

export const UpdateOrderSchema = z.object({
  customizedUrl: z.string().url(),
  material: z.enum(toTuple(MATERIALS.options)),
  finish: z.enum(toTuple(FINISHES.options)),
  color: z.enum(toTuple(COLORS)),
  model: z.enum(toTuple(MODELS)),
});
export const GetResetCode = z.object({
  email: z.string().email(),
});

export const ValidateResetCode = z.object({
  email: z.string().email(),
  code: z.string(),
});

export const SetNewPassword = z.object({
  email: z.string().email(),
  code: z.string(),
  password: z.string(),
});

declare global {
  namespace Express {
    export interface Request {
      userId?: string;
      role?: "user" | "admin";
      rawBody?: Buffer;
    }
  }
}
