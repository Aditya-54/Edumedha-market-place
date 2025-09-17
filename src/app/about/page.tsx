"use client";

import { Card, CardContent } from "@/components/ui/card";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function AboutPage() {
  return (
    <div className="min-h-screen w-full">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-rose-100 via-indigo-100 to-emerald-100" />
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h1 className="text-4xl md:text-6xl font-semibold text-slate-900">About Edumedha</h1>
          <p className="mt-4 text-lg text-slate-700 max-w-3xl">
            Edumedha is a social initiative by JIMS empowering youth and children through education,
            skill training, and employment. Our marketplace turns creativity into livelihood, making
            every purchase a step toward a brighter future.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <h2 className="text-3xl font-semibold text-slate-900">Our Mission</h2>
        <p className="mt-3 text-slate-700 max-w-3xl">
          We bridge education and employment by enabling youth to design, craft, and sell handmade
          products. Proceeds directly support skill development and community initiatives.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-10">
          {[
            { label: "beneficiaries", value: "40,000+" },
            { label: "years of experience", value: "14+" },
            { label: "NGO partners", value: "20" },
          ].map((s) => (
            <Card key={s.label} className="bg-white/70 backdrop-blur border-slate-200">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-slate-900">{s.value}</div>
                <div className="mt-1 text-slate-600 capitalize">{s.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-gradient-to-br from-blue-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h2 className="text-3xl font-semibold text-slate-900">Testimonials</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {[
              {
                quote:
                  "Thanks to Edumedha, I sold my first batch of handloom bags and funded my college semester!",
                name: "Aarav",
              },
              {
                quote:
                  "Our NGO collective gained new exposure and consistent income for women artisans.",
                name: "Meera",
              },
              {
                quote:
                  "Beautiful platform with real impact. Love the curation and the stories behind each product.",
                name: "Rahul",
              },
            ].map((t) => (
              <Card key={t.name} className="border-slate-200">
                <CardContent className="p-6">
                  <p className="text-slate-700">“{t.quote}”</p>
                  <p className="mt-3 text-sm text-slate-500">— {t.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      <WhatsAppButton />
    </div>
  );
}