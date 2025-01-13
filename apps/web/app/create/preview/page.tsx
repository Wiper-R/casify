import apiClient from "@/lib/api-client";
import { Order } from "@repo/types";
import { notFound } from "next/navigation";
import PreviewPage from "./preview-page";

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
    if (!order || !order.Customization || order.state != "pending") {
      notFound();
    }
    return <PreviewPage order={order} />;
  } catch (e) {
    notFound();
  }
}
