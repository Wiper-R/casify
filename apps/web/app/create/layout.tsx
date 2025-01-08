import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Steps } from "@/components/steps";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <MaxWidthWrapper className="flex flex-col flex-grow">
      <Steps />
      {children}
    </MaxWidthWrapper>
  );
}
