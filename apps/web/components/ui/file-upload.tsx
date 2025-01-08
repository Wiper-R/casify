"use client";

import { useId } from "@/hooks/useId";
import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

type FileUploadProps = {
  className?: string;
  accept?: string;
} & Omit<ComponentProps<"input">, "type">;

export function FileUpload({
  className,
  accept = "image/*",
  children,
  id,
  ...props
}: FileUploadProps) {
  const _id = useId(id);
  return (
    <div className={cn("flex", className)}>
      <input
        type="file"
        accept={accept}
        id={_id}
        className="hidden"
        {...props}
      />
      <label
        className={cn(
          "bg-gray-200 flex-grow rounded my-4 flex items-center justify-center cursor-pointer",
        )}
        htmlFor={_id}
      >
        {children}
      </label>
    </div>
  );
}
