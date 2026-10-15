// components/auth/UserMenu.tsx
"use client";

import { useSession, signOut } from "next-auth/react";
import { Link } from "@/i18n/navigation";

export default function LoginMenu() {
  const { data: session, status } = useSession();

  if (status === "loading") return <div className="h-8 w-20" />;

  if (!session) {
    return <Link href="/login">Log in</Link>;
  }

  return (
    <div className="flex items-center gap-3">
      <span>{session.user.name ?? session.user.email}</span>
      <button
        onClick={() =>
          signOut({ redirect: false }).then(() => location.reload())
        }
      >
        Log out
      </button>
    </div>
  );
}
