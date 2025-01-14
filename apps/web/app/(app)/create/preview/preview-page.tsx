import { Button } from "@/components/ui/button";
import {
  BASE_PRICE,
  COLORS,
  FINISHES,
  MATERIALS,
  MODELS,
} from "@repo/constants";
import { Order } from "@repo/types";
import { CheckIcon } from "lucide-react";
import NextImage from "next/image";
import { CheckoutButton } from "./checkout-button";

export default function ReviewPage({ order }: { order: Order }) {
  const Customization = order.Customization!;
  const color = COLORS.find((c) => c.value == Customization.color)!;
  const material = MATERIALS.options.find(
    (m) => m.value == Customization.material,
  )!;
  const finish = FINISHES.options.find((f) => f.value == Customization.finish)!;
  const model = MODELS.find((m) => m.value == Customization.model)!;
  return (
    <div className="py-10 items-center flex gap-10">
      <div className="relative w-60 h-[30rem]">
        <div
          className="absolute inset-0"
          style={{ backgroundColor: color.color }}
        />
        <NextImage src={Customization.customizedUrl} alt="Your Image" fill />
        <NextImage src={"/phone-frame.png"} fill alt="Phone Frame" />
      </div>
      <div className="flex-grow">
        <h3 className="text-3xl font-bold">Your {model.name} case</h3>
        <p className="flex gap-2 text-sm items-center">
          <CheckIcon className="text-primary w-4 h-4" /> In stock and ready to
          ship
        </p>
        <div className="grid grid-cols-2 gap-20 mt-4 text-sm">
          <div>
            <h5 className="font-semibold">Highlights</h5>
            <ul className="list-disc ml-5 text-gray-700">
              <li>Compatible with wireless chargers</li>
              <li>2-year print warranty</li>
              <li>Packaging made from recycled materials</li>
            </ul>
          </div>
          <div>
            <h5 className="font-semibold">Materials</h5>
            <ul className="list-disc ml-5 text-gray-700">
              <li>High-quality plastic</li>
              <li>Soft-touch matte finish</li>
              <li>Eco-friendly, recyclable materials</li>
            </ul>
          </div>
        </div>
        <hr className="my-10" />
        <div>
          {(
            [
              ["Base Price", BASE_PRICE],
              [`${material.name} material`, material.price],
              [`${finish.name} finish`, finish.price],
            ] as const
          ).map(([head, price]) => {
            if (price == 0) return null;
            return (
              <div
                className="text-gray-500 font-semibold text-sm flex justify-between"
                key={head}
              >
                <span>{head}</span>
                <span>
                  {price.toLocaleString("en-US", {
                    currency: "USD",
                    style: "currency",
                  })}
                </span>
              </div>
            );
          })}
          <hr className="my-4" />
          <div className="flex text-gray-800 justify-between font-semibold text-sm">
            <span>Order Total</span>
            <span>
              {(BASE_PRICE + material.price + finish.price).toLocaleString(
                "en-US",
                {
                  currency: "USD",
                  style: "currency",
                },
              )}
            </span>
          </div>
          <CheckoutButton order={order} />
        </div>
      </div>
    </div>
  );
}
