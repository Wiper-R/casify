import { CheckIcon, StarIcon } from "lucide-react";
import React from "react";
import { MaxWidthWrapper } from "../max-width-wrapper";
import Reviews from "./reviews";

const reviews = [
  {
    review:
      "I absolutely love Casify! I wanted a custom phone case with my favorite photo of my family, and the entire process was super simple and fast. The website is user-friendly, and I was able to upload my photo and see a preview of the case instantly. The quality of the case exceeded my expectations—it’s sturdy, vibrant, and fits perfectly. It's such a special feeling to carry my loved ones with me everywhere I go.",
    author: "William Alvarez",
    image: "/persons/1.jpg",
  },
  {
    review:
      "Casify made gift shopping so much easier for me! I ordered a custom case for my sister with a picture of her dog, and she absolutely loved it. The printing quality is top-notch, and the case feels durable while still being sleek and stylish. The whole process was hassle-free, and the delivery was super quick. I’ll definitely be using Casify again for more gifts in the future. This service is a game-changer for personalized products!",
    author: "Carter Lopez",
    image: "/persons/2.jpg",
  },
];

function Testimonials() {
  return (
    <div className="bg-blue-200/10 p-10">
      <MaxWidthWrapper className="mb-40">
        <h3 className="text-6xl text-center font-bold">
          What our customers say
        </h3>
        <div className="grid grid-cols-2 gap-20 my-20">
          {reviews.map((review) => (
            <div className="flex flex-col" key={review.review}>
              <div className="flex">
                {new Array(5).fill(0).map((_, i) => (
                  <StarIcon className="fill-primary" strokeWidth={0} key={i} />
                ))}
              </div>
              <p className="my-6 text-lg">{`"${review.review}"`}</p>
              <div className="flex gap-2">
                <img
                  src={review.image}
                  alt={review.author}
                  className="rounded-full w-12 h-12"
                />
                <div>
                  <span className="font-medium">{review.author}</span>
                  <div className="flex gap-1 items-center">
                    <CheckIcon className="text-primary w-4 h-4" />
                    <span className="font-semibold text-gray-600 text-sm">
                      Verified Purchase
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </MaxWidthWrapper>
      <Reviews />
    </div>
  );
}

export default Testimonials;
