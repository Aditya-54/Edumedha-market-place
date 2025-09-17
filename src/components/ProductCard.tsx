"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/hooks/useLocalProducts";
import { useCart } from "@/components/CartProvider";
import { useRef, useState } from "react";
import { ProductDialog } from "@/components/ProductDialog";

const WA_NUMBER = "919999999999"; // TODO: replace with official number

export function ProductCard({ product }: { product: Product }) {
  const cart = useCart();
  const imgRef = useRef<HTMLDivElement | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAdd = () => {
    cart.add(product, 1);
    // Fly-to-cart animation: clone image, animate to header cart
    const imgEl = imgRef.current?.querySelector("img");
    const cartBtn = document.querySelector("button:has(svg[data-lucide='shopping-cart'])") as HTMLElement | null;
    if (!imgEl || !cartBtn) return;
    const rect = imgEl.getBoundingClientRect();
    const clone = imgEl.cloneNode(true) as HTMLElement;
    Object.assign(clone.style, {
      position: "fixed",
      left: rect.left + "px",
      top: rect.top + "px",
      width: rect.width + "px",
      height: rect.height + "px",
      borderRadius: "12px",
      zIndex: "9999",
      transition: "all 700ms cubic-bezier(0.22, 1, 0.36, 1)",
      boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
    } as CSSStyleDeclaration);
    document.body.appendChild(clone);
    const target = cartBtn.getBoundingClientRect();
    requestAnimationFrame(() => {
      Object.assign(clone.style, {
        left: target.left + target.width / 2 + "px",
        top: target.top + target.height / 2 + "px",
        width: "24px",
        height: "24px",
        opacity: "0.3",
        transform: "translate(-50%, -50%) rotate(10deg)",
        borderRadius: "50%",
      } as CSSStyleDeclaration);
    });
    setTimeout(() => clone.remove(), 800);
  };

  return (
    <>
      <Card 
        className="group overflow-hidden border-slate-200 h-full flex flex-col cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => setDialogOpen(true)}
      >
        <div ref={imgRef} className="relative h-48">
          <Image src={product.image} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
        </div>
        <CardContent className="p-5 flex-1 flex flex-col">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold text-slate-900">{product.name}</h3>
            <span className="text-slate-900 font-bold">₹{product.price}</span>
          </div>
          <p className="mt-2 text-sm text-slate-600 line-clamp-2">{product.description}</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Button 
              onClick={(e) => {
                e.stopPropagation();
                handleAdd();
              }} 
              className="bg-pink-600 hover:bg-pink-700"
            >
              Add to Cart
            </Button>
            <Button 
              asChild 
              variant="outline"
              onClick={(e) => e.stopPropagation()}
            >
              <a
                href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
                  `Hello Edumedha! I'm interested in ${product.name} (₹${product.price}).`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Buy in WhatsApp
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <ProductDialog 
        product={product} 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
      />
    </>
  );
}