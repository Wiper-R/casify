"use client";
import React, { useEffect, useRef, useState } from "react";
import { Phone } from "../phone";
import { MaxWidthWrapper } from "../max-width-wrapper";

function Column({
  reviews,
  marqueSpeed,
}: {
  reviews: string[];
  marqueSpeed: number;
}) {
  const [containerHeight, setContainerHeight] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null!);
  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      setContainerHeight(entries[0].target.clientHeight);
    });

    observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, []);
  const cssParameters = {
    "--marque-duration": `${containerHeight / (marqueSpeed * 5)}s`,
  } as React.CSSProperties;
  return (
    <div
      className="grid animate-marque"
      ref={containerRef}
      style={cssParameters}
    >
      {reviews.concat(reviews).map((review, i) => (
        <div className="p-10 rounded-3xl bg-white mb-10" key={i}>
          <Phone className="w-full" imgSrc={review} />
        </div>
      ))}
    </div>
  );
}

function Reviews() {
  return (
    <MaxWidthWrapper className="relative">
      <img
        src="/what-people-are-buying.png"
        className="absolute top-20 -left-20"
      />
      <div className="mx-auto grid grid-cols-3 place-items-center max-w-screen-lg gap-10 overflow-hidden relative h-[800px] max-h-[150vh]">
        <Column
          reviews={["/samples/1.png", "/samples/4.jpeg", "/samples/5.jpeg"]}
          marqueSpeed={30}
        />
        <Column
          reviews={["/samples/3.jpg", "/samples/9.jpg", "/samples/6.webp"]}
          marqueSpeed={20}
        />
        <Column
          reviews={["/samples/2.png", "/samples/7.webp", "/samples/8.webp"]}
          marqueSpeed={30}
        />
        <div className="absolute inset-x-0 top-0 h-32 from-slate-100 bg-gradient-to-b" />
        <div className="absolute inset-x-0 bottom-0 h-32 from-slate-100 bg-gradient-to-t" />
      </div>
    </MaxWidthWrapper>
  );
}

export default Reviews;
