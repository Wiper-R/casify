import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

type ProgressProps = { value: number } & ComponentProps<"div">;
export function Progress({ value, className }: ProgressProps) {
  return (
    <div
      className={cn(
        "bg-white w-60 max-w-full border rounded-md h-4",
        className,
      )}
    >
      <div
        style={{ width: `${value * 100}%` }}
        className="h-full bg-primary rounded-md"
      />
    </div>
  );
}
