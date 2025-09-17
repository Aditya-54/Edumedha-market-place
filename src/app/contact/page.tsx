"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function ContactPage() {
  const [status, setStatus] = useState<string>("");

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-pink-50">
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-4xl md:text-5xl font-semibold text-slate-900">Contact Us</h1>
        <p className="mt-3 text-slate-700">We'd love to hear from you. Fill out the form and we'll get back soon.</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setStatus("Thanks! We'll be in touch.");
          }}
          className="mt-8 space-y-4 bg-white/70 backdrop-blur rounded-xl p-6 border border-slate-200"
        >
          <div>
            <label className="block text-sm text-slate-600">Name</label>
            <Input required placeholder="Your name" className="bg-white mt-1" />
          </div>
          <div>
            <label className="block text-sm text-slate-600">Email</label>
            <Input required type="email" placeholder="you@example.com" className="bg-white mt-1" />
          </div>
          <div>
            <label className="block text-sm text-slate-600">Message</label>
            <Textarea required placeholder="How can we help?" className="bg-white mt-1" />
          </div>
          <Button type="submit" className="bg-slate-900 hover:bg-slate-800">Send message</Button>
          {status && <p className="text-emerald-600 text-sm mt-2">{status}</p>}
        </form>

        <div className="mt-10 text-sm text-slate-700">
          <div className="font-semibold text-slate-900">NGO Details</div>
          <p>Edumedha by JIMS</p>
          <p>Email: contact@edumedha.org</p>
          <p>Phone: +91 99999 99999</p>
          <p>Address: Rohini, Delhi, India</p>
        </div>
      </div>
      <WhatsAppButton />
    </div>
  );
}