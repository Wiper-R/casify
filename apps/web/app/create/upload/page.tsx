"use client";
import { FileUpload } from "@/components/ui/file-upload";
import { ImageIcon } from "lucide-react";
import { ChangeEvent } from "react";

export default function Upload() {
  function onChange(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    //These values come from api
    const signature = "";
    const formData = new FormData();
    formData.append("signature", signature);
    formData.append(
      "api_key",
      process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || "",
    );
    console.log(formData);
  }
  return (
    <FileUpload
      accept="image/png,image/jpeg,image/jpg"
      className="min-h-[400px] flex-grow h-full"
      onChange={onChange}
    >
      <span className="flex flex-col items-center gap-2">
        <ImageIcon />
        <span>Click to upload image</span>
      </span>
    </FileUpload>
  );
}
