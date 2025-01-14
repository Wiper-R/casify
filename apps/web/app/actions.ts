"use server";
import { cookies } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";
import apiClient from "@/lib/api-client";
import { Order, User } from "@repo/types";

export async function auth() {
  noStore();

  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) {
      throw new Error("No authentication token found");
    }
    const res = await apiClient.get("/users/@me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { user: res.data as User };
  } catch (e) {
    return { user: null };
  }
}

export async function getOrder(id: string) {
  // noStore();
  const token = (await cookies()).get("token")?.value;
  const res = await apiClient.get(`/orders/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data as Order;
}
