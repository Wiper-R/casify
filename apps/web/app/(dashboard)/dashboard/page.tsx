import { redirect } from "next/navigation";
import { auth } from "@/app/auth";

export default async function Page() {
  const user = await auth();
  if (!user) redirect("/signin");
  return `Hello, ${user.name}`;
}
