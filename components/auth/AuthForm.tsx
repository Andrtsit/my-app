// components/auth/AuthForm.tsx
"use client";

import { useState, useTransition } from "react";
import { signIn } from "next-auth/react";
import { useRouter, Link } from "@/i18n/navigation";
import { registerUser } from "@/app/actions/auth";

export default function AuthForm({ mode }: { mode: "login" | "register" }) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get("email"));
    const password = String(form.get("password"));
    const name = String(form.get("name") ?? "");

    setError(null);
    startTransition(async () => {
      if (mode === "register") {
        const res = await registerUser({ email, password, name });
        if (!res.ok) {
          setError(res.error);
          return;
        }
      }

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
        return;
      }

      router.push("/menu");
      router.refresh();
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-sm flex-col gap-3"
    >
      {mode === "register" && (
        <input name="name" placeholder="Name" className="rounded border p-2" />
      )}
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className="rounded border p-2"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        required
        minLength={8}
        className="rounded border p-2"
      />

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="rounded bg-black p-2 text-white disabled:opacity-50"
      >
        {mode === "login" ? "Log in" : "Create account"}
      </button>

      <Link
        href={mode === "login" ? "/register" : "/login"}
        className="text-sm text-gray-500"
      >
        {mode === "login" ? "No account? Register" : "Have an account? Log in"}
      </Link>
    </form>
  );
}
