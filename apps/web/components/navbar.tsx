"use client";
import Image from "next/image";
import Link from "next/link";
import Casify from "@/public/casify.png";
import { MaxWidthWrapper } from "./max-width-wrapper";
import { buttonVariants } from "./ui/button";
import { Divider } from "./divider";
import { useAuth } from "@/providers/auth.provider";
import { Loader, Loader2 } from "lucide-react";

export function Navbar() {
  const { auth } = useAuth();
  return (
    <header className="z-[1000] sticky top-0 bg-background/80 p-4 shadow backdrop-blur-lg">
      <MaxWidthWrapper className="flex justify-between items-center">
        <Link href={"/"}>
          <Image src={Casify} alt="Casify" width={40} />
        </Link>
        <ul className="flex gap-4 items-center">
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
            <span>Hi, {auth.user?.name}</span>
          )}
          <Divider />
          <li className={buttonVariants({ variant: "default" })}>
            <Link href="/create/upload">Create Case</Link>
          </li>
        </ul>
      </MaxWidthWrapper>
    </header>
  );
}
