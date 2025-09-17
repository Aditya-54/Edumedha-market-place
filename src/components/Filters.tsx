"use client";

import { useMemo } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export type SortOption = "popularity-desc" | "price-asc" | "price-desc";

export function Filters({
  categories,
  category,
  sort,
  onChange,
}: {
  categories: string[];
  category: string;
  sort: SortOption;
  onChange: (next: { category: string; sort: SortOption }) => void;
}) {
  const uniqueCategories = useMemo(
    () => Array.from(new Set(["All", ...categories])).filter(Boolean),
    [categories]
  );

  return (
    <div className="w-full grid gap-4 sm:grid-cols-2">
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select
          value={category}
          onValueChange={(val) => onChange({ category: val, sort })}
        >
          <SelectTrigger id="category" className="bg-white">
            <SelectValue placeholder="Choose category" />
          </SelectTrigger>
          <SelectContent>
            {uniqueCategories.map((c) => {
              const value = c === "All" ? "category-all" : `category-${c.toLowerCase().replace(/\s+/g, "-")}`;
              return (
                <SelectItem key={value} value={value}>
                  {c}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="sort">Sort by</Label>
        <Select
          value={sort}
          onValueChange={(val: SortOption) => onChange({ category, sort: val })}
        >
          <SelectTrigger id="sort" className="bg-white">
            <SelectValue placeholder="Sort products" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popularity-desc">Popularity</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export default Filters;