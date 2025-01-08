import Link from "next/link";
import { MaxWidthWrapper } from "./max-width-wrapper";

export function Footer() {
  return (
    <footer className="bg-white text-gray-700 text-sm mt-auto">
      <MaxWidthWrapper className="flex justify-between py-6">
        <span>
          &copy; {new Date().getFullYear()} Casify, Inc. All Rights Reserved
        </span>
        <ul className="flex items-center gap-4">
          <li>
            <Link href="/">Terms</Link>
          </li>
          <li>
            <Link href="/">Privacy Policy</Link>
          </li>
          <li>
            <Link href="/">Cookie Policy</Link>
          </li>
        </ul>
      </MaxWidthWrapper>
    </footer>
  );
}
