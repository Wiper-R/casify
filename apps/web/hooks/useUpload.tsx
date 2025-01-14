"use client";
import apiClient from "@/lib/api-client";
import axios from "axios";
import { useCallback, useState } from "react";

export function useUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const upload = useCallback(
    async (file: File) => {
      setIsUploading(true);
      try {
        const res = await apiClient.post("/orders/upload");
        const { signature, timestamp } = res.data;
        const formData = new FormData();
        formData.append("signature", signature);
        formData.append("timestamp", timestamp);
        formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
        formData.append("file", file);
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            onUploadProgress: (event) => {
              setProgress(event.progress || 0);
            },
          },
        );
        const data = response.data;
        return data;
      } finally {
        setIsUploading(false);
      }
    },
    [setIsUploading, setProgress],
  );
  return { isUploading, progress, upload };
}
