import { Link } from "@/i18n/navigation"
import { Suspense } from "react"
import ThemeToggle from "../theme/ThemeToggle"
import CartBadge from "../cart/CartBadge"
import LoginMenu from "../auth/LoginMenu"
import LanguageSelector from "../LanguageSelector"
import { Skeleton } from "./skeleton"

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4">
        <div className="flex gap-2">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight text-primary"
          >
            🍕 My App
          </Link>
          <Suspense fallback={<Skeleton className="h-8 w-36" />}>
            <LanguageSelector />
          </Suspense>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Suspense fallback={<Skeleton className="h-8" />}>
            <LoginMenu />
          </Suspense>
          <CartBadge />
        </div>
      </div>
    </header>
  )
}

export default Header
