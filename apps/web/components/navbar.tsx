"use client";
import Image from "next/image";
import Link from "next/link";
import Casify from "@/public/casify.png";
import { MaxWidthWrapper } from "./max-width-wrapper";
import { buttonVariants } from "./ui/button";
import { useAuth } from "@/providers/auth.provider";
import { Loader2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export function Navbar() {
  const { auth } = useAuth();
  return (
    <header className="z-[1000] sticky top-0 bg-background/80 p-4 shadow backdrop-blur-lg">
      <MaxWidthWrapper className="flex justify-between items-center">
        <Link href={"/"}>
          <Image src={Casify} alt="Casify" width={40} />
        </Link>
        <ul className="flex items-center -gap-4">
          {auth.state == "unauthenticated" ? (
            <>
              <li className={buttonVariants({ variant: "ghost" })}>
                <Link href="/signup">Signup</Link>
              </li>
              <li className={buttonVariants({ variant: "ghost" })}>
                <Link href="/signin">Login</Link>
              </li>
            </>
          ) : auth.state == "loading" ? (
            <Loader2 className="animate-spin" />
          ) : (
            <>
              <li className={buttonVariants({ variant: "ghost" })}>
                <Link href="/logout">Logout</Link>
              </li>
              {auth.user.role == "admin" ? (
                <li className={buttonVariants({ variant: "ghost" })}>
                  <Link href="/dashboard">Dashboard</Link>
                </li>
              ) : (
                <li className={buttonVariants({ variant: "ghost" })}>
                  <Link href="/dashboard">Dashboard</Link>
                </li>
              )}
            </>
          )}
          <Separator orientation="vertical" className="h-8 mx-5" />
          <li className={buttonVariants({ variant: "default" })}>
            <Link href="/create/upload">Create Case</Link>
          </li>
        </ul>
      </MaxWidthWrapper>
    </header>
  );
}
