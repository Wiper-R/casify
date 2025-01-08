import { cn } from "@/lib/utils";

export function Phone({
  imgSrc,
  className,
}: {
  imgSrc: string;
  className?: string;
}) {
  return (
    <div
      className={cn("relative w-[280px] max-w-full overflow-hidden", className)}
    >
      <div className="absolute inset-0">
        <img
          src={imgSrc}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <img src="/phone-frame.png" className="relative w-full inset-0" />
    </div>
  );
}
