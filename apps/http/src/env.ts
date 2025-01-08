import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
	PORT: z.coerce.number(),
	JWT_SECRET: z.string(),
	CLOUDINARY_CLOUD_NAME: z.string(),
	CLOUDINARY_API_KEY: z.string(),
	CLOUDINARY_API_SECRET: z.string(),
	CLOUDINARY_URL: z.string().url()
});

const env = envSchema.parse(process.env);
export default env;
