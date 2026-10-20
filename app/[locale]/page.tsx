import { Link } from "@/i18n/navigation";
import { buttonVariants } from "@/components/ui/button";
import { getTranslations } from "next-intl/server";

export default async function Home() {
  const t = await getTranslations("homepage");
  return (
    <section className="flex flex-col items-center gap-6  py-24 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        {t('h1')}
      </h1>
      <p className="max-w-md text-muted-foreground">
        {t('p')}
      </p>
      <Link href="/menu" className={buttonVariants({ size: "lg" })}>
        {t('link')}
      </Link>
    </section>
  );
}