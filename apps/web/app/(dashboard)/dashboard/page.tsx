import { auth } from "@/actions";
import { redirect } from "next/navigation";
import Dashboard from "./dashboard";

export default async function Page() {
  const { user } = await auth();
  if (!user) redirect("/signin");
  return <Dashboard user={user} />;
}
