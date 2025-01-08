import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

type MaxWidthWrapperProps = ComponentProps<"div">;
export function MaxWidthWrapper({ className, ...props }: MaxWidthWrapperProps) {
  return (
    <div
      className={cn("mx-auto px-8 max-w-screen-xl", className)}
      {...props}
    ></div>
  );
}
