import { redirect } from "next/navigation";
import { auth } from "@/app/actions";
import Dashboard from "./dashboard";

export default async function Page() {
  const { user } = await auth();
  if (!user) redirect("/signin");
  return <Dashboard user={user} />;
}
