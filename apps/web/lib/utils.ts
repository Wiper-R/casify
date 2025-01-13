import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function base64ToBlob(
  base64: string,
  mimeType: string = "",
): Promise<Blob> {
  return new Promise((resolve, reject) => {
    try {
      const byteCharacters = atob(base64);
      const byteArrays: Uint8Array[] = [];

      const CHUNK_SIZE = 1024;
      for (
        let offset = 0;
        offset < byteCharacters.length;
        offset += CHUNK_SIZE
      ) {
        const chunk = byteCharacters.slice(offset, offset + CHUNK_SIZE);
        const byteNumbers = new Array(chunk.length);

        for (let i = 0; i < chunk.length; i++) {
          byteNumbers[i] = chunk.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
      }

      const blob = new Blob(byteArrays, { type: mimeType });
      resolve(blob);
    } catch (error) {
      reject(error);
    }
  });
}
