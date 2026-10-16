import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";

export default function Home() {
  return (
    <section className="flex flex-col items-center gap-6 py-24 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Fresh pizza, <span className="text-primary">fast</span>.
      </h1>
      <p className="max-w-md text-muted-foreground">
        Pick your favourites from the menu and we&apos;ll take care of the rest.
      </p>
      <Link href="/menu" className={buttonVariants({ size: "lg" })}>
        View the menu
      </Link>
    </section>
  );
}