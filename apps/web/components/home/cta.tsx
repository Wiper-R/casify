import React from "react";
import { MaxWidthWrapper } from "../max-width-wrapper";
import { Phone } from "../phone";
import { CheckIcon } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import Link from "next/link";

function CTA() {
  return (
    <MaxWidthWrapper className="my-20">
      <h3 className="text-center max-w-3xl text-6xl font-bold leading-normal mx-auto">
        Upload your photo and get{" "}
        <span className="bg-primary text-primary-foreground px-4">
          your own case
        </span>{" "}
        now
      </h3>
      <div className="flex gap-4 items-center justify-center my-10">
        <img
          src="/samples/9.jpg"
          className="object-cover w-[400px] h-[600px]"
        />
        <img src="/arrow-right.png" className="flex-shrink-0" />
        <Phone imgSrc="/samples/9.jpg" className="shrink-0" />
      </div>
      <div className="flex items-center flex-col">
        <div className="grid mb-10">
          {[
            "High-quality silicone material",
            "Scratch- and fingerprint resistant coating",
            "Wireless charging compatible",
            "5 year print warranty",
          ].map((quality) => (
            <span key={quality} className="flex items-center gap-2">
              <CheckIcon className="text-primary w-6 h-6" />
              <span className="font-medium text-lg">{quality}</span>
            </span>
          ))}
        </div>
        <Link className = {buttonVariants({size: "lg"})} href={"/create"}>Create Your Case Now</Link>
      </div>
    </MaxWidthWrapper>
  );
}

export default CTA;
