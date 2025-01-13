"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { SigninSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import apiClient from "@/lib/api-client";
import { useAuth } from "@/providers/auth.provider";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SigninPage() {
  const router = useRouter();
  const { refetch, auth } = useAuth();
  const { register, ...form } = useForm<SigninSchema>({
    resolver: zodResolver(SigninSchema),
  });
  async function onSubmit(values: SigninSchema) {
    try {
      const res = await apiClient.post("/signin", values);
      console.log(res.data);
      refetch();
    } catch (e) {}
  }

  useEffect(() => {
    if (auth.state == "authenticated") {
      router.push("/");
    }
  }, [auth.state]);
  return (
    <div className="flex flex-col gap-4 flex-grow h-full">
      <h3 className="text-3xl font-bold flex-grow h-full">Signin</h3>
      <form
        className="my-auto flex gap-4 flex-col"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" {...register("email")} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" {...register("password")} />
        </div>
        <Button size={"lg"}>Login</Button>
        <Link
          href={`/reset-password?email=${form.watch("email")}`}
          className="ml-auto text-sm hover:underline"
        >
          Forgot password
        </Link>
      </form>
      <div className="flex-grow h-full" />
    </div>
  );
}
