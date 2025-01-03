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

declare global {
  namespace Express {
    export interface Request {
      userId?: string;
    }
  }
}
