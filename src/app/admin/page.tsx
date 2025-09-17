"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocalProducts } from "@/hooks/useLocalProducts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

export default function AdminPage() {
  const { products, addProduct, removeProduct, ensureSeed } = useLocalProducts();
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    ensureSeed();
  }, [ensureSeed]);

  const canAdd = useMemo(() => name && price > 0 && description && image && category, [name, price, description, image, category]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-amber-50 to-sky-50">
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-5xl font-semibold text-slate-900">Admin Panel</h1>
        <p className="text-slate-600 mt-2">Upload products to appear on the website. You can also remove products.</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!canAdd) return;
            addProduct({ name, price, description, image, category, popularity: 1 });
            setName("");
            setPrice(0);
            setDescription("");
            setImage("");
            setCategory("");
          }}
          className="mt-8 grid gap-4 bg-white/70 backdrop-blur p-6 rounded-xl border border-slate-200"
        >
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-slate-600">Name</label>
              <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Product name" className="bg-white mt-1" />
            </div>
            <div>
              <label className="block text-sm text-slate-600">Price (₹)</label>
              <Input type="number" min={1} value={price} onChange={(e) => setPrice(parseInt(e.target.value || "0"))} placeholder="799" className="bg-white mt-1" />
            </div>
            <div>
              <label className="block text-sm text-slate-600">Image URL</label>
              <Input value={image} onChange={(e) => setImage(e.target.value)} placeholder="https://images.unsplash.com/..." className="bg-white mt-1" />
            </div>
            <div>
              <label className="block text-sm text-slate-600">Category</label>
              <Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Bags, Art, Decor..." className="bg-white mt-1" />
            </div>
          </div>
          <div>
            <label className="block text-sm text-slate-600">Description</label>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short description" className="bg-white mt-1" />
          </div>
          <div>
            <Button type="submit" disabled={!canAdd} className="bg-slate-900 hover:bg-slate-800">Add Product</Button>
          </div>
        </form>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p) => (
            <Card key={p.id} className="h-full flex flex-col">
              <CardContent className="p-4 flex-1 flex flex-col gap-3">
                <div className="font-semibold text-slate-900">{p.name}</div>
                <div className="text-sm text-slate-600">₹{p.price} • {p.category}</div>
                <p className="text-sm text-slate-600 line-clamp-2">{p.description}</p>
                <img src={p.image} alt={p.name} className="h-32 w-full object-cover rounded" />
                <Button onClick={() => removeProduct(p.id)} variant="destructive" className="mt-auto">Remove</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}