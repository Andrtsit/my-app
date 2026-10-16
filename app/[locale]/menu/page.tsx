import AddToCartButton from "@/components/cart/AddToCartButton";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link } from "@/i18n/navigation";
import { getProducts } from "@/lib/data/products";
import { priceFormatter } from "@/lib/priceFormatter";
import Image from "next/image";

async function Menu() {
  const products = await getProducts();

  return (
    <div className="space-y-8">
      <header className="flex items-center gap-3">
        <h1 className="text-3xl font-bold tracking-tight">Menu</h1>
        <Badge variant="secondary">{products.length} products</Badge>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <Card
            key={product.id}
            className="group gap-0 overflow-hidden py-0 transition duration-200 hover:-translate-y-1 hover:shadow-lg"
          >
            <Link className="relative aspect-square w-full overflow-hidden bg-muted" href={`/product/${product.id}`}>
              <Image
                src={product.imgSrc}
                alt={product.title}
                fill
                sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover transition duration-300 group-hover:scale-105"
              />
            </Link>

            <CardHeader className="pt-4">
              <CardTitle className="text-lg">{product.title}</CardTitle>
              {product.description && (
                <CardDescription className="line-clamp-2">
                  {product.description}
                </CardDescription>
              )}
            </CardHeader>

            <CardFooter className="mt-auto justify-between py-4">
              <span className="text-xl font-bold">
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
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Menu;