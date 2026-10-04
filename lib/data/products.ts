import { cacheLife, cacheTag } from "next/cache";
import { prisma } from "@/lib/prisma";

export async function getProducts() {
  "use cache";
  cacheLife("hours");
  cacheTag("products");

  return prisma.product.findMany({ orderBy: { id: "asc" } });
}

export async function getProduct(id: number) {
  "use cache";
  cacheLife("hours");
  cacheTag("products", `product-${id}`);

  return prisma.product.findUnique({ where: { id } });
}

// Used at build time only, so no caching
export async function getProductIds() {
  return prisma.product.findMany({ select: { id: true } });
}