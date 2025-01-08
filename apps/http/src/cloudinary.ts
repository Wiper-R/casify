import { v2 as cloudinary } from 'cloudinary';
import env from './env';

cloudinary.config({
	cloud_name: env.CLOUDINARY_CLOUD_NAME,
	api_key: env.CLOUDINARY_API_KEY,
	api_secret: env.CLOUDINARY_API_SECRET
})

export async function generateSignature(){
	const timestamp = Math.floor(Date.now() / 1000);
	const signature = cloudinary.utils.api_sign_request({
		timestamp,
	}, env.CLOUDINARY_API_SECRET)
	return {timestamp, signature}
}
