"use client";
import OrderCard from "@/components/order-card";
import apiClient from "@/lib/api-client";
import { Order, User } from "@repo/types";
import { Loader2 } from "lucide-react";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import { useEffect } from "react";

const fetchOrders = async ({ pageParam = null, limit = 10 }) => {
  const { data } = await apiClient.get("/orders", {
    params: { cursor: pageParam, limit },
  });
  return data as { nextCursor: string | null; data: Order[] };
};

export const useOrders = (limit: number) => {
  return useInfiniteQuery(
    ["orders"],
    ({ pageParam }) => fetchOrders({ pageParam, limit }),
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor || undefined,
    },
  );
};

export default function Dashboard({ user }: { user: User }) {
  const { data, isLoading, fetchNextPage } = useOrders(2);
  const { ref, inView } = useInView({
    threshold: 0,
  });
  useEffect(() => {
    if (inView && !isLoading) {
      fetchNextPage();
    }
  }, [inView, isLoading]);
  const havePages = data?.pages.length && data.pages[0].data.length > 0;
  return (
    <>
      <div className="my-10 flex flex-col rounded-lg items-center gap-4">
        {isLoading ? (
          <Loader2 className="animate-spin" />
        ) : havePages ? (
          data.pages.map(({ data }) =>
            data.map((o) => (
              <OrderCard
                order={o}
                key={o.id}
                isAdminView={user.role == "admin"}
              />
            )),
          )
        ) : (
          <p className="text-gray-700">No Orders</p>
        )}
        <div ref={ref} />
      </div>
    </>
  );
}
