import { notFound } from "next/navigation";
import PreviewPage from "./preview-page";
import { getOrder } from "@/app/actions";

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
    const order = await getOrder(id);
    if (!order || !order.Customization || order.state != "pending") {
      notFound();
    }
    return <PreviewPage order={order} />;
  } catch (e) {
    notFound();
  }
}
