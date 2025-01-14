import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { User } from "@repo/types";

export default function Dashboard({ user }: { user: User }) {
  return <MaxWidthWrapper>{user.name}</MaxWidthWrapper>;
}
