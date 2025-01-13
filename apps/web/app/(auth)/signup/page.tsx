"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import apiClient from "@/lib/api-client";
import { useAuth } from "@/providers/auth.provider";
import { SignupSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

export default function SignupPage() {
  const { auth } = useAuth();
  const router = useRouter();
  const { register, ...form } = useForm<SignupSchema>({
    resolver: zodResolver(SignupSchema),
  });
  async function onSubmit(values: SignupSchema) {
    try {
      console.log("On submit called");
      const res = await apiClient.post("/signup", values);
      console.log(res.data);
    } catch (e) {
      // TODO: Handle zod errors
    }
  }
  useEffect(() => {
    if (auth.state == "authenticated") {
      router.push("/");
    }
  }, [auth.state]);
  return (
    <div className="flex flex-col gap-4 flex-grow h-full">
      <h3 className="text-3xl font-bold flex-grow h-full">Signup</h3>
      <form
        className="my-auto flex gap-4 flex-col"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input type="email" id="email" {...register("email")} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" {...register("name")} />
        </div>
        <div className="flex flex-col gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" {...register("password")} />
        </div>
        <Button size="lg">Create Account</Button>
      </form>
      <div className="flex-grow h-full" />
    </div>
  );
}
