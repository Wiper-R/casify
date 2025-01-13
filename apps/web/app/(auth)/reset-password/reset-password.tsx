"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import apiClient from "@/lib/api-client";
import moment from "moment";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";

type Step = "email" | "code" | "password";

export default function ResetPassowrd() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState<Step>("email");
  const [validUntil, setValidUntil] = useState<Date>();
  const router = useRouter();
  const [form, setForm] = useState({
    email: searchParams.get("email") || "",
    password: "",
    code: "",
  });
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (step == "email") {
      try {
        const res = await apiClient.post("/get-reset-code", {
          email: form.email,
        });
        setValidUntil(res.data.validUntil);
        setStep("code");
      } catch (e) {
        alert("Invalid email");
      }
    } else if (step == "code") {
      try {
        await apiClient.post("/validate-reset-code", {
          email: form.email,
          code: form.code,
        });
        setStep("password");
      } catch (e) {
        alert("Invalid Code");
      }
    } else {
      try {
        await apiClient.post("/new-password", {
          email: form.email,
          code: form.code,
          password: form.password,
        });
        router.push("/signin");
      } catch (e) {
        alert("Something went wrong");
      }
    }
  }
  return (
    <div className="flex flex-col gap-4 flex-grow h-full">
      <h3 className="text-3xl font-bold flex-grow h-full">
        Reset Your Password
      </h3>
      <form className="my-auto flex gap-4 flex-col" onSubmit={onSubmit}>
        <div className="flex flex-col gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={(e) =>
              setForm((f) => {
                return { ...f, email: e.target.value };
              })
            }
            disabled={step != "email"}
            placeholder="Enter your email"
          />
        </div>
        {step == "code" && (
          <div className="flex flex-col gap-2">
            <Label htmlFor="code">Code</Label>
            <Input
              type="text"
              id="code"
              name="code"
              placeholder="Enter 6 letters code"
              onChange={(e) =>
                setForm((f) => {
                  return { ...f, code: e.target.value };
                })
              }
            />
          </div>
        )}
        {step == "password" && (
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              placeholder="Enter a password"
              value={form.password}
              onChange={(e) =>
                setForm((f) => {
                  return { ...f, password: e.target.value };
                })
              }
            />
          </div>
        )}
        <div className="flex flex-col">
          <Button size={"lg"}>
            {step == "email"
              ? "Send Code"
              : step == "code"
                ? "Submit Code"
                : "Reset Password"}
          </Button>
          {step != "email" && <TimeLeft validUntil={validUntil!} />}
        </div>
      </form>
      <div className="flex-grow h-full" />
    </div>
  );
}

function TimeLeft({ validUntil }: { validUntil: Date }) {
  const [time, setTime] = useState<string | null>(null);
  const ref = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateTime = () => {
      const remaining = moment(validUntil).diff(moment());
      if (remaining > 0) {
        setTime(moment.utc(remaining).format("mm:ss"));
      } else {
        setTime(null);
        if (ref.current) clearInterval(ref.current);
      }
    };

    updateTime();
    ref.current = setInterval(updateTime, 1000);

    return () => {
      if (ref.current) clearInterval(ref.current);
    };
  }, [validUntil]);

  if (time === null) {
    return (
      <span className="ml-auto text-bold text-gray-700 text-sm">Expired</span>
    );
  }

  return (
    <span className="ml-auto text-bold text-gray-700 text-sm">{time}</span>
  );
}
