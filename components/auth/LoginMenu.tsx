"use client";

import { useSession, signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function LoginMenu() {
  const { data: session, status } = useSession();

  if (status === "loading") return <Skeleton className="h-8 w-32" />;

  if (!session) {
    return (
      <Link href="/login" className={buttonVariants({ size: "sm" })}>
        Log in
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="hidden text-sm text-muted-foreground sm:inline">
        {session.user.name ?? session.user.email}
      </span>
      <Button
        variant="outline"
        size="sm"
        className={'cursor-pointer'}
        onClick={() =>
          signOut({ redirect: false }).then(() => location.reload())
        }
      >
        <LogOut />
        Log out
      </Button>
    </div>
  );
}