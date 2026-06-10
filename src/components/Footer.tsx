"use client";

import { Globe, Camera, Share2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-surface-container pt-24 pb-32 border-t border-white/5 px-5 md:px-6">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-16 lg:gap-8">
        {/* Branding */}
        <div className="space-y-8">
          <h4 className="font-[family-name:var(--font-display)] text-3xl text-primary tracking-[0.3em] uppercase">
            PRITHVI
          </h4>
          <p className="text-on-surface-variant font-light leading-relaxed max-w-sm">
            Dedicated to the preservation and celebration of performing arts
            since 1978. Experience the intersection of culture and cuisine.
          </p>
          <div className="flex gap-6">
            <Globe
              size={24}
              strokeWidth={1.5}
              className="text-primary hover:scale-125 transition-transform cursor-pointer"
            />
            <Camera
              size={24}
              strokeWidth={1.5}
              className="text-primary hover:scale-125 transition-transform cursor-pointer"
            />
            <Share2
              size={24}
              strokeWidth={1.5}
              className="text-primary hover:scale-125 transition-transform cursor-pointer"
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-8">
          <p className="text-primary font-bold text-xs uppercase tracking-[0.3em]">
            Navigate
          </p>
          <nav className="grid grid-cols-2 gap-4">
            {[
              "The Theatre",
              "Menu Edit",
              "Reservations",
              "Gift Cards",
              "Careers",
              "Press Kit",
            ].map((link) => (
              <a
                key={link}
                className="text-on-surface-variant hover:text-primary transition-colors text-sm font-light"
                href="#"
              >
                {link}
              </a>
            ))}
          </nav>
        </div>

        {/* Visit Us */}
        <div className="space-y-8">
          <p className="text-primary font-bold text-xs uppercase tracking-[0.3em]">
            Visit Us
          </p>
          <div className="glass-card p-6 rounded-sm border-white/5 space-y-4">
            <p className="text-on-surface font-light text-sm">
              20 Janki Kutir, Juhu Church Road, Mumbai 400049
            </p>
            <a
              className="inline-block text-primary font-bold text-[10px] uppercase tracking-widest border-b border-primary/20 pb-1 hover:border-primary transition-all"
              href="#"
            >
              Get Directions
            </a>
          </div>
          <p className="text-on-surface-variant text-[10px] uppercase tracking-[0.2em] opacity-40">
            © 2024 PRITHVI THEATRE &amp; CAFE. AN ARTISTIC LEGACY.
          </p>
        </div>
      </div>
    </footer>
  );
}
