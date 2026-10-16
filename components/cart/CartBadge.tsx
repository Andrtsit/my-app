"use client";

import { ShoppingCart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { priceFormatter } from "@/lib/priceFormatter";
import { selectCount, selectTotal, useCartStore } from "@/store/cart";

export default function CartBadge() {
  const count = useCartStore(selectCount);
  const total = useCartStore(selectTotal);

  return (
    <div className="flex items-center gap-2">
      <ShoppingCart className="size-5" />
      <Badge>{count}</Badge>
      <span className="text-sm font-medium tabular-nums">
        {priceFormatter.format(total / 100)}
      </span>
    </div>
  );
}