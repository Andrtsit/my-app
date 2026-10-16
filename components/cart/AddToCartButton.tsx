"use client";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCartStore, type CartItem } from "@/store/cart";

export default function AddToCartButton({
  product,
}: {
  product: Omit<CartItem, "quantity">;
}) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <Button
      type="button"
      size="sm"
      className="rounded-full active:scale-95"
      onClick={() => addItem(product)}
    >
      <Plus />
      Add
    </Button>
  );
}