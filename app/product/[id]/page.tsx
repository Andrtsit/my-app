import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/cart/AddToCartButton";
import { getProduct, getProductIds } from "@/lib/data/products";

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

  return {
    title: product.title,
    description: product.description ?? undefined,
  };
}

export default async function ProductPage({ params }: Props) {
  const id = parseId((await params).id);
  if (!id) notFound();

  const product = await getProduct(id);
  if (!product) notFound();

  return (
    <main className="mx-auto w-full max-w-5xl bg-white px-4 py-10">
      <Link href="/menu" className="text-sm text-gray-500 hover:text-gray-900">
        ← Back to menu
      </Link>

      <div className="mt-6 grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-100">
          <Image
            src={product.imgSrc}
            alt={product.title}
            fill
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {product.title}
          </h1>

          {product.description && (
            <p className="text-gray-600">{product.description}</p>
          )}


          <div className="mt-auto flex items-center justify-between border-t pt-6">
           
            <AddToCartButton
              product={{
                id: product.id,
                title: product.title,
                price : product.price,
                imgSrc: product.imgSrc,
              }}
            />
          </div>
        </div>
      </div>
    </main>
  );
}