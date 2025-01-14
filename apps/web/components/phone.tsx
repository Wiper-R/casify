import { cn } from "@/lib/utils";

export function Phone({
  imgSrc,
  className,
  backgroundColor,
}: {
  imgSrc: string;
  backgroundColor?: string;
  className?: string;
}) {
  return (
    <div
      className={cn("relative w-[280px] max-w-full overflow-hidden", className)}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0" style={{ backgroundColor }} />
        <img
          src={imgSrc}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>
      <img src="/phone-frame.png" className="relative w-full inset-0" />
    </div>
  );
}
