"use client";

import { useCallback, useEffect, useState } from "react";

export type Product = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  popularity?: number;
};

const STORAGE_KEY = "edumedha_products_v2";

const seed: Product[] = [
  {
    id: "seed-handwoven-tote",
    name: "Handwoven Tote Bag",
    price: 799,
    description: "Crafted by youth artisans using sustainable fibers. Durable, stylish, and kind to the planet.",
    image:
      "https://images.unsplash.com/photo-1544568100-847a948585b9?q=80&w=1600&auto=format&fit=crop",
    category: "Bags",
    popularity: 5,
  },
  {
    id: "seed-panda-tote",
    name: "Cute Panda Canvas Tote Bag",
    price: 199,
    description: "An adorable hand-painted canvas tote bag with a panda hugging bamboo. Lightweight yet durable, this eco-friendly bag is ideal for daily use, shopping, or gifting. Designed to spread smiles wherever you go.",
    image: "https://image2url.com/images/1758141128366-8af38daf-b5d8-4289-b751-4a47c82c780a.jpg",
    category: "Tote Bags",
    popularity: 8,
  },
];

export function useLocalProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setProducts(JSON.parse(raw));
      } else {
        setProducts(seed);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
      }
    } catch (e) {
      console.warn("Failed to load products", e);
    }
  }, []);

  const ensureSeed = useCallback(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
        setProducts(seed);
      }
    } catch {}
  }, []);

  const addProduct = useCallback((p: Omit<Product, "id">) => {
    setProducts((prev) => {
      const next = [{ ...p, id: `p_${Date.now()}` }, ...prev];
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const removeProduct = useCallback((id: string) => {
    setProducts((prev) => {
      const next = prev.filter((p) => p.id !== id);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { products, addProduct, removeProduct, ensureSeed };
}