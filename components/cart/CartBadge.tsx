"use client";

import { selectCount, selectTotal, useCartStore } from "@/store/cart";

export default function CartBadge() {
  console.log("cart badge rerenderingg")
  const count = useCartStore(selectCount);
  const total = useCartStore(selectTotal);

  return (
    <div>
      <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-black px-2 text-xs font-medium text-white">
        TotalQuantity: {count}
      </span>
       <span className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-black px-2 text-xs font-medium text-white">
        TotalPrice: {total / 100}
      </span>
    </div>
  );
}