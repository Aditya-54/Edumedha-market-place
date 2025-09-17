"use client";

import { useMemo, useState } from "react";
import { useCart } from "./CartProvider";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Trash2, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { createWhatsAppCartMessage } from "@/hooks/useCart";

export default function CartDrawer() {
  const cart = useCart();
  const [open, setOpen] = useState(false);
  const waMsg = useMemo(() => createWhatsAppCartMessage(cart.items), [cart.items]);
  const waHref = `https://wa.me/919999999999?text=${encodeURIComponent(waMsg)}`;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="relative">
          <ShoppingCart className="h-6 w-6" />
          {cart.count > 0 && (
            <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full h-5 min-w-5 px-1 flex items-center justify-center">
              {cart.count}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px] sm:w-[500px]">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {cart.items.length === 0 && (
            <p className="text-sm text-muted-foreground">Your cart is empty. Explore the <Link href="/marketplace" className="underline">marketplace</Link>.</p>
          )}

          {cart.items.map((i) => (
            <div key={i.id} className="flex items-center gap-4 border rounded-lg p-3">
              <div className="flex-1">
                <div className="font-medium">{i.name}</div>
                <div className="text-sm text-muted-foreground">₹{i.price} × {i.quantity} = ₹{i.price * i.quantity}</div>
                <div className="mt-2 flex items-center gap-2">
                  <Button size="sm" variant="outline" onClick={() => cart.setQuantity(i.id, Math.max(1, i.quantity - 1))}>-</Button>
                  <span className="w-8 text-center">{i.quantity}</span>
                  <Button size="sm" variant="outline" onClick={() => cart.setQuantity(i.id, i.quantity + 1)}>+</Button>
                </div>
              </div>
              <Button size="icon" variant="destructive" onClick={() => cart.remove(i.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}

          {cart.items.length > 0 && (
            <div className="border-t pt-4">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-muted-foreground">Subtotal</div>
                <div className="text-lg font-semibold">₹{cart.subtotal}</div>
              </div>
              <div className="flex gap-3">
                <Button className="flex-1" variant="secondary" onClick={cart.clear}>Clear</Button>
                <a href={waHref} target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Checkout on WhatsApp</Button>
                </a>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}


