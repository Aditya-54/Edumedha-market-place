"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocalProducts, Product } from "@/hooks/useLocalProducts";
import Filters, { SortOption } from "@/components/Filters";
import { ProductCard } from "@/components/ProductCard";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function MarketplacePage() {
  const { products, ensureSeed } = useLocalProducts();
  const [category, setCategory] = useState<string>("category-all");
  const [sort, setSort] = useState<SortOption>("popularity-desc");

  useEffect(() => {
    ensureSeed();
  }, [ensureSeed]);

  const categories = useMemo(() => products.map((p) => p.category), [products]);

  const filtered = useMemo(() => {
    let list: Product[] = products;
    if (category !== "category-all") {
      const human = category.replace(/^category-/, "").replace(/-/g, " ");
      list = list.filter((p) => p.category.toLowerCase() === human);
    }
    if (sort === "popularity-desc") {
      list = [...list].sort((a, b) => (b.popularity ?? 0) - (a.popularity ?? 0));
    } else if (sort === "price-asc") {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sort === "price-desc") {
      list = [...list].sort((a, b) => b.price - a.price);
    }
    return list;
  }, [products, category, sort]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-pink-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <header className="mb-8">
          <h1 className="text-3xl md:text-5xl font-semibold text-slate-900">Marketplace</h1>
          <p className="text-slate-600 mt-2">Discover handcrafted goods made by talented youth and our NGO partners.</p>
        </header>

        <Filters
          categories={categories}
          category={category}
          sort={sort}
          onChange={({ category: c, sort: s }) => {
            setCategory(c);
            setSort(s);
          }}
        />

        <div className="mt-6 text-sm text-slate-700">{filtered.length} item(s) found</div>

        <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>

      {/* WhatsApp floating button */}
      <WhatsAppButton />
    </div>
  );
}