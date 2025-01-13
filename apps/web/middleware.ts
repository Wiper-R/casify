import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = (await cookies()).get("token");
  const headers = new Headers(request.headers);
	console.log("Setting token")
  if (token) {
    headers.set("Authorization", `Bearer ${token.value}`);
  }
  return NextResponse.next({ headers });
}
