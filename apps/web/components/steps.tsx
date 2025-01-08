"use client";

import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

type Step = {
  title: string;
  description: string;
  imgSrc: string;
  url: string;
};
const STEPS: Step[] = [
  {
    title: "Step 1: Choose Image",
    description: "Choose an image for your case",
    imgSrc: "/checkout/upload.png",
    url: "/upload",
  },
  {
    title: "Step 2: Customize Design",
    description: "Make the case yours",
    imgSrc: "/checkout/customize.png",
    url: "/customize",
  },
  {
    title: "Step 3: Review Design",
    description: "Review your final design",
    imgSrc: "/checkout/customize.png",
    url: "/preview",
  },
];

export function Steps() {
  const pathname = usePathname();
  return (
    <div className="flex justify-center shadow w-fit bg-white mx-auto">
      {STEPS.map((sec, i) => {
        const isCurrent = pathname.endsWith(sec.url);
        const isCompleted = STEPS.slice(i + 1).some((step) =>
          pathname.endsWith(step.url),
        );
        return (
          <div className="relative bg-white" key={sec.title}>
            <div className="flex gap-4 px-6 py-4 items-center">
              <img src={sec.imgSrc} alt="" className="w-20" />
              <div className="flex flex-col">
                <span>
                  <b>{sec.title}</b>
                </span>
                <span>{sec.description}</span>
              </div>
            </div>
            <div
              className={cn(
                "h-1 w-full bg-gray-400 absolute bottom-0 inset-x-0",
                {
                  "bg-gray-800": isCurrent,
                  "bg-primary": isCompleted,
                },
              )}
            />
            {i < STEPS.length - 1 && (
              <svg
                className="text-gray-500/20 absolute right-0 translate-x-full z-10 inset-y-0 h-full"
                viewBox="0 0 35 334"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 0V133.5L31.5 169L2 205V334"
                  stroke="currentColor"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );
}
