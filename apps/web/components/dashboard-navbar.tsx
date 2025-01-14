import { auth } from "@/app/actions";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

export default async function DashboardNavbar() {
  return (
    <header className="justify-between flex p-4 bg-background shadow items-center z-50 relative">
      <Link href="/">
        <img src="/casify.png" className="w-8" />
      </Link>
      <div className="flex">
        <Link
          href="/logout"
          className={buttonVariants({ variant: "destructive" })}
        >
          Logout
        </Link>
      </div>
    </header>
  );
}
