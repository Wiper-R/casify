import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Twitter } from "lucide-react";
import { PropsWithChildren } from "react";

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex flex-col flex-grow relative">
      <div className="absolute inset-y-0 left-0 right-1/2 bg-blue-400/10 -z-10" />
      <MaxWidthWrapper className="grid grid-cols-2 flex-grow">
        <div className="flex flex-col h-full justify-center gap-4 p-4">
          <h2 className="text-5xl font-bold text-primary">Casify</h2>
          <p className="text-gray-900">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem
            libero, temporibus itaque aperiam commodi sit facilis eum neque
            tempora quidem iusto eos a aliquam praesentium fugiat, voluptatum
            numquam. Ad placeat odit debitis perspiciatis voluptates officia
            neque, facilis aspernatur molestiae aliquam!
          </p>
          <div className="flex gap-2 mt-10">
            <Button>
              <Twitter />
            </Button>
            <Button>
              <Facebook />
            </Button>
            <Button>
              <Instagram />
            </Button>
          </div>
          <p className="text-sm self-start text-gray-500">
            We ensure that your data is safe with us.
          </p>
        </div>
        <div className="h-full flex flex-col p-10">{children}</div>
      </MaxWidthWrapper>
    </div>
  );
}
