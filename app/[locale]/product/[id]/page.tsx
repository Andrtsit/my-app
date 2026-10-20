import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProduct, getProductIds } from "@/lib/data/products";
import { localize } from "@/lib/helpers/localize";
import { priceFormatter } from "@/lib/priceFormatter";

type Props = { params: Promise<{ id: string }> };

function parseId(raw: string) {
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
}

// Prerender every product at build time
export async function generateStaticParams() {
  const products = await getProductIds();
  return products.map((p) => ({ id: String(p.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = parseId((await params).id);
  if (!id) return {};

  const product = await getProduct(id);
  if (!product) return {};

  const locale = await getLocale();

  return {
    title: localize(product.title_ml, locale),
    description: localize(product.description_ml, locale) || undefined,
  };
}

export default async function ProductPage({ params }: Props) {
  const id = parseId((await params).id);
  if (!id) notFound();

  const product = await getProduct(id);
  if (!product) notFound();

  const t = await getTranslations("product");
  const locale = await getLocale();
  const title = localize(product.title_ml, locale);
  const description = localize(product.description_ml, locale);

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <Link
        href="/menu"
        className={buttonVariants({ variant: "ghost", size: "sm" })}
      >
        <ArrowLeft />
        {t("backToMenu")}
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl border bg-muted">
          <Image
            src={product.imgSrc}
            alt={title}
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">{title}</CardTitle>
            {description && (
              <CardDescription className="text-base">
                {description}
              </CardDescription>
            )}
          </CardHeader>

          <CardFooter className="mt-auto justify-between border-t">
            <span className="text-2xl font-bold">
              {priceFormatter.format(product.price / 100)}
            </span>
            <AddToCartButton
              product={{
                id: product.id,
                title,
                price: product.price,
                imgSrc: product.imgSrc,
              }}
            />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}