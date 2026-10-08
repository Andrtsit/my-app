import AddToCartButton from "@/components/cart/AddToCartButton";
import CartBadge from "@/components/cart/CartBadge";
import { getProducts } from "@/lib/data/products";
import { priceFormatter } from "@/lib/priceFormatter";
import Image from "next/image";


async function Menu() {
  console.log("rerendering menu page")
  const products = await getProducts();

  return (
    <main className="w-full bg-amber-100 px-4 py-1">
      <header className="mb-8">
      <CartBadge />
        <h1 className="text-3xl font-bold tracking-tight text-green-300">Menu</h1>
        <p className="mt-1 text-sm text-gray-500">{products.length} products</p>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <article
            key={product.id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
              <Image
                src={product.imgSrc}
                alt={product.title}
                fill
                sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-300 group-hover:scale-105"
              />
            </div>

            <div className="flex flex-1 flex-col gap-2 p-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {product.title}
              </h2>

              {product.description && (
                <p className="line-clamp-2 text-sm text-gray-500">
                  {product.description}
                </p>
              )}

              <div className="mt-auto flex items-center justify-between pt-3">
                <span className="text-xl font-bold text-gray-900">
                  {priceFormatter.format(product.price / 100)}
                </span>
                <AddToCartButton
                  product={{
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    imgSrc: product.imgSrc,
                  }}
                />
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}

export default Menu;