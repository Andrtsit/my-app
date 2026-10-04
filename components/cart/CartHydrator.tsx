"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cart";

export default function CartHydrator() {
  console.log("carthydrator rerendering");
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return null;
}