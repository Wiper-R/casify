import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import apiClient from "@/lib/api-client";
import { Order } from "@repo/types";
import { notFound } from "next/navigation";
import PhoneView from "@/components/phone-view";
import { BASE_PRICE, FINISHES, MATERIALS } from "@repo/constants";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;
  if (!id || typeof id !== "string") {
    notFound();
  }
  try {
    const res = await apiClient.get(`/orders/${id}`);
    const order: Order = res.data;
    if (order.state != "paid") {
      notFound();
    }

    return <Thankyou order={order} />;
  } catch (e) {
    notFound();
  }
}

function Thankyou({ order }: { order: Order }) {
  const Address = order.Address!;
  const material = MATERIALS.options.find(
    (m) => m.value == order.Customization?.material,
  )!;
  const finish = FINISHES.options.find(
    (f) => f.value == order.Customization?.finish,
  )!;
  return (
    <MaxWidthWrapper className="max-w-5xl py-10">
      <div className="space-y-4">
        <div>
          <span className="text-green-700">Thank You</span>
          <h3 className="font-bold text-4xl">Your order is on the way.</h3>
        </div>
        <p className="text-gray-700">
          We have received your order and it is now processing
        </p>
        <hr />
        <div className="text-gray-700">
          <div>
            <b>Order ID:</b> <span>{order.id}</span>
          </div>
          <div>
            <b>Transaction ID:</b> <span>{order.transactionId}</span>
          </div>
        </div>
        <hr />
      </div>
      <PhoneView
        customizedUrl={order.Customization?.customizedUrl!}
        color={order.Customization?.color!}
      />
      <hr className="my-10" />
      <div className="text-gray-700">
        <h4 className="font-bold">Shipping Address</h4>
        <ul className="mt-4">
          <li>{order.User?.name}</li>
          <li>{Address.line1}</li>
          {Address.line2 && <li>{Address.line2}</li>}
          <li>
            {Address.city}, {Address.postal_code}
          </li>
          <li>
            {Address.state}, {Address.country}
          </li>
        </ul>
      </div>
      <hr className="my-10" />
      <div className="grid grid-cols-2 text-gray-700">
        <div className="flex flex-col">
          <span className="font-bold">Payment Status</span>
          <span>Paid</span>
        </div>
        <div className="flex flex-col">
          <span className="font-bold">Sub Total</span>
          <span>
            {(order.amount / 100).toLocaleString("en-IN", {
              currency: "INR",
              style: "currency",
            })}
          </span>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
