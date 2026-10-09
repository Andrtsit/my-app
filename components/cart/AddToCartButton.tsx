"use client";

import { useCartStore, type CartItem } from "@/store/cart";

export default function AddToCartButton({
  product,
}: {
  product: Omit<CartItem, "quantity">;
}) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <button
      type="button"
      onClick={() => addItem(product)}
      className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 active:scale-95"
    >
      Add
    </button>
  );
}