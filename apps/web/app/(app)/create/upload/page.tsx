"use client";
import { Progress } from "@/components/progress";
import apiClient from "@/lib/api-client";
import { cn } from "@/lib/utils";
import { Order } from "@repo/types";
import { Image, Loader2, MousePointerSquareDashed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Dropzone from "react-dropzone";
import { useUpload } from "@/hooks/useUpload";

export default function UploadPage() {
  const [isDragOver, setIsDragOver] = useState(false);
  const router = useRouter();

  async function createOrder({
    imageUrl,
    width,
    height,
  }: {
    imageUrl: string;
    width: number;
    height: number;
  }) {
    const res = await apiClient.post("/orders", { imageUrl, width, height });
    return res.data as Order;
  }
  const { upload, isUploading, progress: uploadProgress } = useUpload();

  async function handleUpload(files: File[]) {
    try {
      const data = await upload(files[0]);
      const order = await createOrder({
        imageUrl: data.secure_url,
        width: data.width,
        height: data.height,
      });
      router.push(`/create/customize?id=${order.id}`);
    } catch (error) {
      alert("Failed to upload");
      // TODO: Handle these errors
    }
  }

  return (
    <Dropzone
      accept={{
        "image/png": [".png"],
        "image/jpeg": [".jpeg"],
        "image/jpg": [".jpg"],
      }}
      onDropAccepted={handleUpload}
      onDropRejected={(rejection) => {
        console.log(rejection);
      }}
      onDragEnter={() => setIsDragOver(true)}
      onDragLeave={() => setIsDragOver(false)}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          className={cn(
            "h-full w-full flex-1 flex flex-col items-center justify-center border-dashed border-2 my-10 min-h-[400px]",
            isDragOver && "bg-blue-200/20",
          )}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          {isDragOver ? (
            <MousePointerSquareDashed className="h-6 w-6 text-zinc-500 mb-2" />
          ) : isUploading ? (
            <Loader2 className="animate-spin h-6 w-6 text-zinc-500 mb-2" />
          ) : (
            <Image className="h-6 w-6 text-zinc-500 mb-2" />
          )}
          <div className="flex flex-col justify-center mb-2 text-sm text-zinc-700">
            {isUploading ? (
              <div className="flex flex-col items-center">
                <p>Uploading...</p>
                {
                  <Progress
                    value={uploadProgress}
                    className="mt-2 w-40 h-2 bg-gray-300"
                  />
                }
              </div>
            ) : isDragOver ? (
              <p>
                <span className="font-semibold">Drop file</span> to upload
              </p>
            ) : (
              <p>
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
            )}
          </div>
          {<p className="text-xs text-zinc-500">PNG, JPG, JPEG</p>}
        </div>
      )}
    </Dropzone>
  );
}
