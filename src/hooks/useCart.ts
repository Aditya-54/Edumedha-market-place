"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { Product } from "@/hooks/useLocalProducts";

export type CartItem = Product & { quantity: number };

const STORAGE_KEY = "edumedha_cart_v2";

export function useCartState() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  const persist = useCallback((next: CartItem[]) => {
    setItems(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {}
  }, []);

  const add = useCallback((product: Product, quantity: number = 1) => {
    persist(
      (() => {
        const existing = items.find((i) => i.id === product.id);
        if (existing) {
          return items.map((i) =>
            i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
          );
        }
        return [{ ...product, quantity }, ...items];
      })()
    );
  }, [items, persist]);

  const remove = useCallback((id: string) => {
    persist(items.filter((i) => i.id !== id));
  }, [items, persist]);

  const setQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) return remove(id);
    persist(items.map((i) => (i.id === id ? { ...i, quantity } : i)));
  }, [items, persist, remove]);

  const clear = useCallback(() => persist([]), [persist]);

  const count = useMemo(() => items.reduce((acc, i) => acc + i.quantity, 0), [items]);
  const subtotal = useMemo(() => items.reduce((acc, i) => acc + i.price * i.quantity, 0), [items]);

  return { items, add, remove, setQuantity, clear, count, subtotal };
}

// Simple helper to create a WhatsApp checkout message
export function createWhatsAppCartMessage(items: CartItem[]) {
  if (!items.length) return "Hello! I'd like to place an order on Edumedha.";
  const lines = items.map(
    (i, idx) => `${idx + 1}. ${i.name} x${i.quantity} — ₹${i.price * i.quantity}`
  );
  const total = items.reduce((acc, i) => acc + i.price * i.quantity, 0);
  return `Hello Edumedha! I'd like to buy:\n\n${lines.join("\n")}\n\nTotal: ₹${total}\n\nPlease guide me with payment & delivery.`;
}


