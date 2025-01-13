import { notFound } from "next/navigation";
import CustomizePage from "./customize-page";
import apiClient from "@/lib/api-client";
import { Order } from "@repo/types";

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
    if (order.Customization) notFound();
    return (
      <CustomizePage
        id={order.id}
        imageUrl={order.imageUrl}
        imageDimensions={{ width: order.width, height: order.height }}
      />
    );
  } catch (e) {
    notFound();
  }
}
