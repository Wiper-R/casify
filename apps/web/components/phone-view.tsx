"use client";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { COLORS } from "@repo/constants";
import { useEffect, useRef, useState } from "react";

export default function PhoneView({
  customizedUrl,
  color: _color,
}: {
  customizedUrl: string;
  color: string;
}) {
  const color = COLORS.find((c) => c.value == _color)!;
  const ref = useRef<HTMLDivElement>(null!);
  const [renderedDimension, setRenderedDimension] = useState({
    width: 0,
    height: 0,
  });

  function handleResize() {
    const { width, height } = ref.current.getBoundingClientRect();
    setRenderedDimension({ width, height });
  }

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const translateX = Math.max(-44, -44 * (renderedDimension.width / 1280));
  const translateY = Math.max(-24, -24 * (renderedDimension.height / 768));
  const rotation = "-7.5deg";

  return (
    <AspectRatio
      ref={ref}
      ratio={1280 / 768}
      className="bg-gray-200 rounded-lg border-gray-400 border relative flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute"
        style={{
          transform: `translateX(${translateX}px) translateY(${translateY}px)`,
          rotate: rotation,
        }}
      >
        <img
          src={customizedUrl}
          width={renderedDimension.width / (1280 / 231)}
          style={{
            backgroundColor: color.color,
          }}
        />
      </div>
      <div className="relative inset-0 w-full h-full">
        <img src="/hand-holding-phone-frame.png" />
      </div>
    </AspectRatio>
  );
}
