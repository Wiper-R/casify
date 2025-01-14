"use client";
import OrderCard from "@/components/order-card";
import apiClient from "@/lib/api-client";
import { Order, User } from "@repo/types";
import { useQuery } from "react-query";

export default function Dashboard({ user }: { user: User }) {
  const { data } = useQuery({
    async queryFn() {
      const res = await apiClient.get("/orders");
      return res.data as { data: Order[]; nextCursor: string };
    },

    queryKey: ["orders", user.id],
  });
  return (
    <>
      <div className="my-10 flex flex-col rounded-lg items-center gap-4">
        {data?.data.map((o) => (
          <OrderCard order={o} key={o.id} isAdminView={user.role == "admin"} />
        ))}
      </div>
    </>
  );
}
