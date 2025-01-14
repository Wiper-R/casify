import DashboardNavbar from "@/components/dashboard-navbar";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { PropsWithChildren } from "react";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <MaxWidthWrapper>
      <DashboardNavbar />
      {children}
    </MaxWidthWrapper>
  );
}
