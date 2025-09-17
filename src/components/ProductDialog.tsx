"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Product } from "@/hooks/useLocalProducts";
import { useCart } from "@/components/CartProvider";
import { useRef } from "react";

const WA_NUMBER = "919999999999"; // TODO: replace with official number

interface ProductDialogProps {
  product: Product | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProductDialog({ product, open, onOpenChange }: ProductDialogProps) {
  const cart = useCart();
  const imgRef = useRef<HTMLDivElement | null>(null);

  if (!product) return null;

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
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{product.name}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          {/* Product Image */}
          <div ref={imgRef} className="relative h-80 md:h-96">
            <Image 
              src={product.image} 
              alt={product.name} 
              fill 
              className="object-cover rounded-lg" 
            />
          </div>
          
          {/* Product Details */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold text-green-600">₹{product.price}</span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {product.category}
              </span>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Product Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
              <p className="text-gray-600 leading-relaxed">
                This beautiful handmade item is crafted with love and care by talented youth artisans. 
                Each piece is unique and tells a story of creativity, skill development, and community empowerment. 
                By purchasing this product, you're directly supporting education programs and sustainable livelihoods 
                for underprivileged youth in our community.
              </p>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Impact</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="font-semibold text-green-800">Education Support</div>
                  <div className="text-green-600">Funds go to learning programs</div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="font-semibold text-blue-800">Skill Development</div>
                  <div className="text-blue-600">Empowers youth artisans</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-3">
              <h3 className="text-lg font-semibold">Shipping & Returns</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Free shipping on orders above ₹500</li>
                <li>• 7-day return policy</li>
                <li>• Handmade with care - slight variations may occur</li>
                <li>• Delivery within 5-7 business days</li>
              </ul>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button 
                onClick={handleAdd} 
                className="flex-1 bg-pink-600 hover:bg-pink-700 text-white"
              >
                Add to Cart
              </Button>
              <Button 
                asChild 
                variant="outline" 
                className="flex-1"
              >
                <a
                  href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
                    `Hello Edumedha! I'm interested in ${product.name} (₹${product.price}). Can you provide more details?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Buy in WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
