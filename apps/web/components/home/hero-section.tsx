import { Phone } from "@/components/phone";
import { CheckIcon, StarIcon } from "lucide-react";
import { MaxWidthWrapper } from "../max-width-wrapper";
export function HeroSection() {
  return (
    <MaxWidthWrapper className="my-10 flex justify-between flex-col lg:flex-row gap-10">
      <div className="max-w-2xl">
        <h3 className="text-foreground text-6xl font-bold leading-snug">
          Photo of your <br />
          <span className="bg-primary text-primary-foreground px-2">
            Loved ones
          </span>{" "}
          on the phone case
        </h3>
        <p className="my-4 text-xl text-gray-700">
          Why put some random case when you can get custom case with your{" "}
          <span className="text-primary">custom</span> picture.
        </p>
        <ul>
          {[
            "High Quality Material",
            "2 Year Print Guarantee",
            "Affordable Prices",
          ].map((q) => (
            <li key={q} className="flex items-center space-x-2">
              <CheckIcon className="text-primary w-6" />
              <span className="font-semibold">{q}</span>
            </li>
          ))}
        </ul>
        {/* Reviews */}
        <div className="flex space-x-2 my-4 items-center">
          <div className="-space-x-4">
            {new Array(5).fill(0).map((m, i) => (
              <span
                className="w-12 h-12 rounded-full bg-gray-400 border-white border-2 inline-block"
                key={i}
              />
            ))}
          </div>
          <div>
            <div className="flex">
              {new Array(5).fill(0).map((_, i) => (
                <StarIcon className="fill-primary" strokeWidth={0} key={i} />
              ))}
              <span></span>
            </div>
            <p className="text-black">500+ Happy Customers</p>
          </div>
        </div>
      </div>
      <div className="relative flex items-start gap-4 max-lg:justify-center">
        <div className="relative">
          <Phone imgSrc="/samples/2.png" />
        </div>
        <img
          src="/LikeThis.png"
          className="top-0 right-0 hidden sm:inline lg:hidden xl:inline"
        />
      </div>
    </MaxWidthWrapper>
  );
}
