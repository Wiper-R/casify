import Image from "next/image";
import Link from "next/link";
import Casify from "@/public/casify.png";
import { MaxWidthWrapper } from "./max-width-wrapper";
import { buttonVariants } from "./ui/button";
import { Divider } from "./divider";

export function Navbar() {
  return (
    <header className="z-10 relative bg-background/10 p-4 shadow backdrop-blur">
      <MaxWidthWrapper className="flex justify-between">
        <Image src={Casify} alt="Casify" width={40} />
        <ul className="flex gap-4">
          <li className={buttonVariants({ variant: "ghost" })}>
            <Link href="/signup">Signup</Link>
          </li>
          <li className={buttonVariants({ variant: "ghost" })}>
            <Link href="/signin">Login</Link>
          </li>
          <Divider />
          <li className={buttonVariants({ variant: "primary" })}>
            <Link href="/create">Create Case</Link>
          </li>
        </ul>
      </MaxWidthWrapper>
    </header>
  );
}
