"use server";
import { cookies } from "next/headers";
import apiClient from "./lib/api-client";
import { User } from "@repo/types";

export async function auth() {
  const token = (await cookies()).get("token")?.value;
  try {
    const req = await apiClient.get("/users/@me/", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return { user: req.data as User };
  } catch (e) {
    return { user: null };
  }
}
