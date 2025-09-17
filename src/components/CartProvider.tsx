"use client";

import { createContext, useContext } from "react";
import { useCartState } from "@/hooks/useCart";

const CartContext = createContext<ReturnType<typeof useCartState> | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const value = useCartState();
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}


