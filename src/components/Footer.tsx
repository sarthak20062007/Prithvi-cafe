"use client";

import { useState } from "react";
import { Globe, Camera, Share2 } from "lucide-react";

export default function Footer() {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    if (typeof window !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "PRITHVI CAFE",
          text: "Where Art Meets Food - Prithvi Cafe, Juhu, Mumbai",
          url: window.location.href,
        });
      } catch {
        // User canceled or share failed
      }
    } else if (typeof window !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch {
        // Copy failed
      }
    }
  };

  const navLinks = [
    { label: "The Theatre", href: "#story", isExternal: false },
    { label: "Menu Edit", href: "#dishes", isExternal: false },
    { label: "Reservations", href: "#reservation", isExternal: false },
    { label: "Gift Cards", href: "#reservation", isExternal: false },
    { label: "Careers", href: "https://prithvitheatre.org/", isExternal: true },
    { label: "Press Kit", href: "https://prithvitheatre.org/", isExternal: true },
  ];

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
          <div className="flex gap-6 items-center">
            <a
              href="https://prithvitheatre.org/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Prithvi Theatre Official Website"
            >
              <Globe
                size={24}
                strokeWidth={1.5}
                className="text-primary hover:scale-125 transition-transform cursor-pointer"
              />
            </a>
            <a
              href="https://www.instagram.com/prithvicafe.official/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Prithvi Cafe Instagram"
            >
              <Camera
                size={24}
                strokeWidth={1.5}
                className="text-primary hover:scale-125 transition-transform cursor-pointer"
              />
            </a>
            <div className="relative inline-flex items-center">
              <button
                type="button"
                onClick={handleShare}
                aria-label="Share Website"
                className="focus:outline-none"
              >
                <Share2
                  size={24}
                  strokeWidth={1.5}
                  className="text-primary hover:scale-125 transition-transform cursor-pointer"
                />
              </button>
              {copied && (
                <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-primary text-background text-[10px] font-bold px-2 py-1 rounded whitespace-nowrap uppercase tracking-wider shadow-lg">
                  Link copied
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-8">
          <p className="text-primary font-bold text-xs uppercase tracking-[0.3em]">
            Navigate
          </p>
          <nav className="grid grid-cols-2 gap-4">
            {navLinks.map((item) => (
              <a
                key={item.label}
                className="text-on-surface-variant hover:text-primary transition-colors text-sm font-light"
                href={item.href}
                {...(item.isExternal
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {item.label}
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
              href="https://www.google.com/maps/dir/?api=1&destination=Prithvi%20Cafe%20Apartment%2C%20Alongside%20Prithvi%20Theatre%2C%2020%2C%20Juhu%20Rd%2C%20Janki%20Kutir%2C%20Juhu%2C%20Mumbai%2C%20Maharashtra%20400049"
              target="_blank"
              rel="noopener noreferrer"
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
