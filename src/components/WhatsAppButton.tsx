"use client";

import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton({ number = "919999999999", message = "Hello Edumedha!" }: { number?: string; message?: string }) {
  const href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50"
    >
      <Button className="rounded-full h-14 w-14 p-0 bg-emerald-500 hover:bg-emerald-600 shadow-lg">
        <MessageCircle className="h-7 w-7 text-white" />
      </Button>
    </a>
  );
}

export default WhatsAppButton;