import { notFound } from "next/navigation";
import CustomizePage from "./customize-page";
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
