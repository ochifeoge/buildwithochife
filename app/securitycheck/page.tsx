// app/auth/page.tsx
"use client";

import { useState, useTransition } from "react";
import { AuthForm } from "@/components/web/AuthForm";
import { login, signup } from "./actions";
import { AuthSchema } from "@/lib/validators/auth";

export default function Page() {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [isPending, startTransition] = useTransition();

  function handleSubmit(data: AuthSchema) {
    startTransition(async () => {
      if (mode === "login") {
        await login(data);
        console.log(data);
      } else {
        await signup(data);
        console.log(data);
      }
    });
  }

  return (
    <div className="container max-w-md py-24 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">
          {mode === "login" ? "Welcome back" : "Create an account"}
        </h1>
        <p className="text-sm text-muted-foreground">
          {mode === "login"
            ? "Sign in to your account"
            : "Get started in less than a minute"}
        </p>
      </div>

      <AuthForm type={mode} onSubmit={handleSubmit} isPending={isPending} />

      <button
        type="button"
        onClick={() => setMode(mode === "login" ? "signup" : "login")}
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        {mode === "login"
          ? "Don’t have an account? Sign up"
          : "Already have an account? Log in"}
      </button>
    </div>
  );
}
