"use server";
import { cookies } from "next/headers";
import { unstable_noStore as noStore } from "next/cache";
import apiClient from "@/lib/api-client";
import { User } from "@repo/types";

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
    return res.data as User;
  } catch (e) {
    return null;
  }
}
