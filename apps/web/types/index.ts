import {z} from "zod"

export const SignupSchema = z.object({
	email: z.string().email(),
	password: z.string(),
	name: z.string()
})

export type SignupSchema = z.infer<typeof SignupSchema>

export const SigninSchema = z.object({
	email: z.string().email(),
	password: z.string(),
})

export type SigninSchema = z.infer<typeof SigninSchema>
