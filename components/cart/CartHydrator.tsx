"use client";

import { useEffect } from "react";
import { useCartStore } from "@/store/cart";

export default function CartHydrator() {
  useEffect(() => {
    useCartStore.persist.rehydrate();
  }, []);

  return null;
}